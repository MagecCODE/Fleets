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
  dota: Dota | null = null;
  unit: Unit | null = null;


  constructor(private navCtrl: NavController) {
    addIcons({ 'log-out-outline': logOutOutline });
  }

  ngOnInit() {

    const employeeId = this.authService.getEmployeeId();   

    console.log("[DEBUG - DOTA - DotaPage] ID del empleado logueado:", employeeId);
    console.log("[DEBUG - DOTA - DotaPage] Usuario cargado:", this.authService.getUser());
    console.log("[DEBUG - DOTA - DotaPage] ID empleado:", this.authService.getEmployeeId());
    this.getDotaInfo(employeeId);     
  }

  // Refactored method to fetch Dota info and then load related Unit and Employees
  private getDotaInfo = (employeeId: number | null) => {
    if (employeeId) {        
      this.dotaService.getDotaByEmpID(employeeId).subscribe({
          next: (dotaResp) => {
            console.log("[DEBUG - DOTA - DotaPage] Dota Response: ",dotaResp);

            this.dota = Array.isArray(dotaResp) ? dotaResp[0] : dotaResp;

            if(!this.dota) return;

            const unitFleet = this.dota.unitfleet;

            console.log("[DEBUG - DOTA - DotaPage] Dota unit: ",unitFleet);

            // 1. Cargar la unidad
            if (unitFleet) {
              this.unitService.getUnitByUnitFleet(unitFleet).subscribe({                
                next: (uniResp) => {
                  this.unit = uniResp;
                  console.log("[DEBUG - UNIT - DotaPage] Unit en getDotaInfo: ", this.unit);
                  this.getIncidenceByUnit(unitFleet);
                  this.getInventoryByUnit(unitFleet);
                }
              });
            }
            

            // 2. Cargar SOLO los empleados de la dotación
            const ids = [
              this.dota.driveId,
              this.dota.sanitId,
              this.dota.facultId
            ];
            
            this.employees = [];

            ids.forEach(id => {
              if (id) {
                this.employeeService.getEmployeeById(id).subscribe({
                  next: (emp) => this.employees.push(emp)});
              }
            });           
          }          
      });
    }
  }

  // Refactor method to fetch incidence of dota
  private getIncidenceByUnit = (unitfleet:number)=> {
    this.incidenceService.getIncdicenceByUnitFleet(unitfleet).subscribe({
      next: (incidenceList) => {
        console.log("[DEBUG - INCIDENCE - DotaPage] Backend:", incidenceList);
        this.incidence = incidenceList;
      }
    });
  }

    // Refactor method to fetch incidence of dota
  private getInventoryByUnit = (unitfleet:number)=> {
    this.inventoryService.getInventoryByUnitFleet(unitfleet).subscribe({
      next: (inventoryList) => {
        console.log("[DEBUG - INVENTORY - DotaPage] Inventory unitFleet:", unitfleet);
        console.log("[DEBUG - INVENTORY - DotaPage] Backend:", inventoryList);
        this.inventory = inventoryList;
      }
    });
  } 

  // Placeholder for new incident creation
  newIncident(unitfleet: number){
    this.navCtrl.navigateForward(`/incident-form/${unitfleet}`);

    console.log("[DEBUG - DOTA - DotaPage] Navegando debur",  this.navCtrl.navigateForward(`/incident-form/${unitfleet}`));
  };

  // Logout
  logout() {
    this.authService.logout();
    this.navCtrl.navigateRoot('/login');
  }
}
