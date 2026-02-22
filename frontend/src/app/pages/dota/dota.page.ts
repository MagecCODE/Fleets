import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { InventoryService } from 'src/app/services/inventory/inventory.service';
import { IncidenciesService } from 'src/app/services/incidence/incidencies.service';
import { DotaService } from 'src/app/services/dota/dota.service';
import { UnitService } from 'src/app/services/unit/unit.service';
import { AuthService } from 'src/app/auth/auth.service';
import { addIcons } from 'ionicons';
import { logOutOutline } from 'ionicons/icons';
import { Employee } from 'src/app/models/employee.model';
import { Dota } from 'src/app/models/dota.model';
import { Incidence } from 'src/app/models/incidence.model';
import { Unit } from 'src/app/models/unit.model';
import { Inventory } from 'src/app/models/inventoty.model';

@Component({
  selector: 'app-dota',
  templateUrl: './dota.page.html',
  styleUrls: ['./dota.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class DotaPage implements OnInit {

  private employeeService = inject(EmployeeService);
  private inventoryService = inject(InventoryService);
  private incidenceService = inject(IncidenciesService);
  private unitService = inject(UnitService);
  private authService = inject(AuthService);
  private dotaService = inject(DotaService);

  employees: Employee[] = [];
  inventory: Inventory[] = [];
  incidence: Incidence[] = [];
  dotaInfo: Dota | null = null;
  unitInfo: Unit | null = null;


  constructor(private navCtrl: NavController) {
    addIcons({ 'log-out-outline': logOutOutline });
  }

  ngOnInit() {

    const employeeId = this.authService.getEmployeeId();   

    this.inventoryService.getInventary().subscribe({
      next: (data) => {
        this.inventory = data;
      },
    });

    this.incidenceService.getIncidencies().subscribe({
      next: (data) => {
        this.incidence = data;
      },
    });
    
    this.getDotaInfo(employeeId);     
  }
  
  // Refactored method to fetch Dota info and then load related Unit and Employees
  private getDotaInfo = (employeeId: number | null) => {
    if (employeeId) {
        this.dotaService.getDotaByEmpID(employeeId).subscribe({
          next: (dota) => {
            this.dotaInfo = dota;
            const unitFleet = this.dotaInfo?.unitfleet;

            // 1. Cargar la unidad
            if (unitFleet) {
              this.unitService.getUnitByUnitFleet(unitFleet).subscribe({
                next: (unit) => {
                  this.unitInfo = unit;
                }
              });
            }

            // 2. Cargar SOLO los empleados de la dotación
            const ids = [
              this.dotaInfo?.driveId,
              this.dotaInfo?.sanitId,
              this.dotaInfo?.facultId
            ];
            this.employees = [];
            ids.forEach(id => {
              if (id) {
                this.employeeService.getEmployeeById(id).subscribe({
                  next: (emp) => this.employees.push(emp)
                });
              }
            });
        }
      });
    }
  }

  logout() {
    this.authService.logout();
    this.navCtrl.navigateRoot('/login');
  }
}
