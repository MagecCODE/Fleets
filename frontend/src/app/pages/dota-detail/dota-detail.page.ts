import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonicModule, NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DotaService } from 'src/app/services/dota/dota.service';
import { UnitService } from 'src/app/services/unit/unit.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { IncidenciesService } from 'src/app/services/incidence/incidencies.service';
import { InventoryService } from 'src/app/services/inventory/inventory.service';

@Component({
  selector: 'app-dota-detail',
  templateUrl: './dota-detail.page.html',
  styleUrls: ['./dota-detail.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class DotaDetailPage implements OnInit {

  private route = inject(ActivatedRoute);
  private dotaService = inject(DotaService);
  private unitService = inject(UnitService);
  private employeeService = inject(EmployeeService);
  private incidenceService = inject(IncidenciesService);
  private inventoryService = inject(InventoryService);

  unit: any = null;
  dota: any = null;
  employees: any[] = [];
  incidences: any[] = [];
  inventory: any[] = [];

  constructor(private navCtrl: NavController){};

  ngOnInit() {
    const unitfleet = Number(this.route.snapshot.paramMap.get('unitfleet'));
    this.loadDotation(unitfleet);
  }

  private loadDotation(unitfleet: number) {
    // 1. Cargar unidad
    this.unitService.getUnitByUnitFleet(unitfleet).subscribe({
      next: (unitResp) => {
        this.unit = Array.isArray(unitResp) ? unitResp[0] : unitResp;
      }
    });

    // 2. Cargar dotación
    this.dotaService.getDotaByUnitFleet(unitfleet).subscribe({
      next: (dotaResp) => {
        this.dota = Array.isArray(dotaResp) ? dotaResp[0] : dotaResp;

        const ids = [
          this.dota.driveId,
          this.dota.sanitId,
          this.dota.facultId
        ];

        ids.forEach(id => {
          if (id) {
            this.employeeService.getEmployeeById(id).subscribe({
              next: (emp) => this.employees.push(emp)
            });
          }
        });
      }
    });

    // 3. Cargar incidencias
    this.incidenceService.getIncdicenceByUnitFleet(unitfleet).subscribe({
      next: (list) => this.incidences = list
    });

    // 4. Cargar inventario
    this.inventoryService.getInventoryByUnitFleet(unitfleet).subscribe({
      next: (list) => this.inventory = list
    });
  };

  goBack() {
    this.navCtrl.back();
  }
}