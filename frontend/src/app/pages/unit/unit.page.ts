import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { InventoryService } from 'src/app/services/inventory/inventory.service';
import { IncidenciesService } from 'src/app/services/incidence/incidencies.service';
import { UnitService } from 'src/app/services/unit/unit.service';
import { AuthService } from 'src/app/auth/auth.service';
import { addIcons } from 'ionicons';
import { logOutOutline } from 'ionicons/icons';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.page.html',
  styleUrls: ['./unit.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class UnitPage implements OnInit {
  private employeeService = inject(EmployeeService);
  private inventoryService = inject(InventoryService);
  private incidenceService = inject(IncidenciesService);
  private unitService = inject(UnitService);
  private authService = inject(AuthService);

  employees: any[] = [];
  products: any[] = [];
  incidence: any[] = [];
  unitInfo: any = null;

  constructor(private navCtrl: NavController) {
    addIcons({ 'log-out-outline': logOutOutline });
  }

  ngOnInit() {
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        this.employees = data;
      },
    });

    this.inventoryService.getInventary().subscribe({
      next: (data) => {
        this.products = data;
      },
    });

    this.incidenceService.getIncidencies().subscribe({
      next: (data) => {
        this.incidence = data;
      },
    });

    const employeeId = this.authService.getEmployeeId();
    if (employeeId) {
      this.unitService.getUnitByEmployeeId(employeeId).subscribe({
        next: (unit) => {
          this.unitInfo = unit;
        },
      });
    }
  }

  logout() {
    this.authService.logout();
    this.navCtrl.navigateRoot('/login');
  }
}
