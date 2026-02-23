import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';
import { DotaService } from 'src/app/services/dota/dota.service';
import { UnitService } from 'src/app/services/unit/unit.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { addIcons } from 'ionicons';
import { logOutOutline } from 'ionicons/icons';
import { Dota } from 'src/app/models/dota.model';
import { Unit } from 'src/app/models/unit.model';
import { Employee } from 'src/app/models/employee.model';

@Component({
  selector: 'app-admin-dota',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class AdminPage implements OnInit {

  private authService = inject(AuthService);
  private dotaService = inject(DotaService);
  private unitService = inject(UnitService);
  private employeeService = inject(EmployeeService);

  adminUser: any = null;
  dotations: Array<{
    dota: Dota;
    unit: Unit | null;
    employees: Employee[];
  }> = [];

  constructor(private navCtrl: NavController) {
    addIcons({ 'log-out-outline': logOutOutline });
  }

  ngOnInit() {
    this.adminUser = this.authService.getUser(); // ajusta según tu modelo de usuario
    this.loadDotations();
  }

  private loadDotations() {
    this.dotaService.getDotas().subscribe({
      next: (dotaList) => {
        // asumimos que getAllDotas devuelve un array de Dota
        this.dotations = [];
        dotaList.forEach((dota: Dota) => {
          const unitFleet = dota.unitfleet;

          const dotationItem: {
            dota: Dota;
            unit: Unit | null;
            employees: Employee[];
          } = {
            dota,
            unit: null,
            employees: []
          };

          // Cargar unidad
          if (unitFleet) {
            this.unitService.getUnitByUnitFleet(unitFleet).subscribe({
              next: (unit) => dotationItem.unit = unit
            });
          }

          // Cargar empleados de la dotación
          const ids = [dota.driveId, dota.sanitId, dota.facultId];
          ids.forEach(id => {
            if (id) {
              this.employeeService.getEmployeeById(id).subscribe({
                next: (emp) => dotationItem.employees.push(emp)
              });
            }
          });

          this.dotations.push(dotationItem);
        });
      }
    });
  }

  openDotationDetail(unitfleet: number) {
    this.navCtrl.navigateForward(`/dota-detail/${unitfleet}`);
  }


  logout() {
    this.authService.logout();
    this.navCtrl.navigateRoot('/login');
  }
}