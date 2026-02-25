import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonicModule, LoadingController, ToastController,NavController } from '@ionic/angular'; 
import { addIcons } from 'ionicons';
import { logOutOutline, addOutline, trashOutline, createOutline } from 'ionicons/icons';

import { IncidenciesService } from 'src/app/services/incidence/incidencies.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Incidence } from 'src/app/models/incidence.model';

@Component({
  selector: 'app-incident-form',
  templateUrl: './incident-form.page.html',
  styleUrls: ['./incident-form.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class IncidentFormPage implements OnInit {

  private route = inject(ActivatedRoute);
  private incidenceService = inject(IncidenciesService);  
  private authService = inject(AuthService); 
  private toastCtrl = inject(ToastController);
  private loadingCtrl= inject(LoadingController);
  private navCtrl = inject(NavController);

  isDeleteAlertOpen: boolean = false;
  incidentToDelete: Incidence | null = null;

  incidents: Incidence[] = [];
  selectedIncident: Incidence | null = null;
  
  isEditing: boolean = false;
  editingIncident: Incidence | null = null;
  isAddingNew: boolean = false;
  newIncident = this.initNewIncidentObject();

  constructor ( ) {
    addIcons({ 
      'log-out-outline': logOutOutline,
      'add-outline': addOutline,
      'trash-outline': trashOutline,
      'create-outline': createOutline,
    });
  }
  
  ngOnInit() {    
    const unitfleet = Number(this.route.snapshot.paramMap.get('unitfleet'));
    
    this.loadIncidences(unitfleet);
  }

  // Refactored method to initialize new incident object with default values
  private initNewIncidentObject() {
    return {
      incidence_type: '',
      unitfleet: undefined as number | undefined,
      dni_emp: '',
      description: '',
      status: 'Pendiente',
      date: new Date()
    };
  }

  // Refactored method to load initial data (employee, unit, and incidents)
  private loadIncidences = ( unitfleet: number) => {
      this.incidenceService.getIncdicenceByUnitFleet(unitfleet).subscribe({
      next: (list) => {
        this.incidents = list;
      },
      error: (err) => {
        console.error('Error loading incidents', err);
      }
    });
  }

  selectIncident(incident: Incidence) {
    this.selectedIncident = incident;
    this.isEditing = false;
    this.editingIncident = null;
  }

  deleteIncident(incident: Incidence) {
    this.incidentToDelete = incident;
    this.isDeleteAlertOpen = true;
  }

  cancelDelete() {
    this.isDeleteAlertOpen = false;
    this.incidentToDelete = null;
  }

  confirmDelete() {
    if (this.incidentToDelete) {
      this.incidenceService.deleteIncidence(this.incidentToDelete.id).subscribe({
        next: () => {
          this.incidents = this.incidents.filter(i => i.id !== this.incidentToDelete!.id);
          this.selectedIncident = null;
          this.isDeleteAlertOpen = false;
          this.incidentToDelete = null;
        },
        error: (err: any) => {
          console.error('Error al borrar la incidencia', err);
        }
      });
    }
  }

  editIncident() {
    if (this.selectedIncident) {
      this.editingIncident = { ...this.selectedIncident };
      this.isEditing = true;
    }
  }

  cancelEdit() {
    this.isEditing = false;
    this.editingIncident = null;
  }

  saveEdit() {
    if (!this.editingIncident || !this.selectedIncident) return;
    
    const newStatus = this.editingIncident.status;
    const newDescription = this.editingIncident.description;

    this.incidenceService.updateIncidence(this.editingIncident.id, { status: newStatus, description: newDescription }).subscribe({
      next: () => {
        // Save to selected object
        this.selectedIncident!.status = newStatus;
        this.selectedIncident!.description = newDescription;
        
        // Save to list
        const listIndex = this.incidents.findIndex(i => i.id === this.selectedIncident!.id);
        if (listIndex !== -1) {
          this.incidents[listIndex].status = newStatus;
          this.incidents[listIndex].description = newDescription;
        }

        this.isEditing = false;
        this.editingIncident = null;
      },
      error: (err: any) => {
        this.showToast('Error al guardar la incidencia', 'danger')
        console.error('[ERROR] Error al guardar la incidencia', err);
      }
    });
  }

  async createIncident() {
    if (!this.newIncident.incidence_type || !this.newIncident.description || !this.newIncident.status) {
      this.showToast('Completa los campos requeridos', 'warning');
      return;
    }
    const loading = await this.loadingCtrl.create({ message: 'Guardando...' });
    await loading.present();

    this.incidenceService.createIncidence(this.newIncident).subscribe({
      next: () => {
        loading.dismiss();
        this.showToast('Incidencia creada con éxito', 'success');        
      },
      error: () => { loading.dismiss(); this.showToast('Error al crear la nueva incidencia', 'danger'); }
    });
  }
  
  // --- NAVIGATION METHODS ---
/*
  // Method to prepare the form for creating a new incident
  prepareNewIncident() {
    this.isAddingNew = true;
    this.selectedIncidence = null;
    this.isEditing = false;
    this.newIncident = {
      ...this.initNewIncidentObject(),
      unitfleet: this.unit?.unitfleet,
      dni_emp: this.currentEmployeeDni
    };
  }

  // Method to select an incident for viewing or editing
  selectIncidence(incidence: Incidence) {
    this.isAddingNew = false;
    this.selectedIncidence = incidence;
    this.isEditing = false;
  }

  // -- PERSISTENCE LOGIC & METHODS ---

  async createIncident() {
    if (!this.newIncident.incidence_type || !this.newIncident.description) {
      this.showToast('Completa los campos requeridos', 'warning');
      return;
    }

    const loading = await this.loadingCtrl.create({ message: 'Guardando...' });
    await loading.present();

    this.incidenceService.createIncidence(this.newIncident as any).subscribe({
      next: () => {
        loading.dismiss();
        this.showToast('Creada con éxito', 'success');
        this.isAddingNew = false;
        if (this.unit) this.loadUnitIncidents(this.unit.unitfleet);
      },
      error: () => { loading.dismiss(); this.showToast('Error al crear', 'danger'); }
    });
  }

  editIncident() {
    if (this.selectedIncidence) {
      this.editingIncident = { ...this.selectedIncidence };
      this.isEditing = true;
    }
  }

  saveEdit() {
    if (!this.editingIncident || !this.selectedIncidence) return;
    
    this.incidenceService.updateIncidence(this.selectedIncidence.id, this.editingIncident).subscribe({
      next: () => {
        this.showToast('Actualizada', 'success');
        this.isEditing = false;
        if (this.unit) this.loadUnitIncidents(this.unit.unitfleet);
        this.selectedIncidence = { ...this.selectedIncidence, ...this.editingIncident } as Incidence;
      }
    });
  }
*/
  // --- HELPERS ---
  private async showToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000, color });
    toast.present();
  }

  goBack() {
    this.navCtrl.back();
  }
}