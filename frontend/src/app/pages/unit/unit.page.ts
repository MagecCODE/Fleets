import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EmployeeService } from 'src/app/services/employee.service';
import { InventoryService } from 'src/app/services/inventory.service';
import { IncidenciesService } from 'src/app/services/incidencies.service';

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

  employees: any[] = [];
  products: any[] = [];
  incidence: any[] = [];

  constructor() {}

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
  }
}
