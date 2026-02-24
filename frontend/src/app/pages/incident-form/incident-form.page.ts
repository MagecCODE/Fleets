import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonicModule, LoadingController, ToastController,NavController } from '@ionic/angular'; 
import { addIcons } from 'ionicons';
import { logOutOutline, addOutline, trashOutline, createOutline, saveOutline, closeOutline } from 'ionicons/icons';

import { IncidenciesService } from 'src/app/services/incidence/incidencies.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { AuthService } from 'src/app/auth/auth.service';

import { Incidence } from 'src/app/models/incidence.model';
import { Employee } from 'src/app/models/employee.model';

@Component({
  selector: 'app-incident-form',
  templateUrl: './incident-form.page.html',
  styleUrls: ['./incident-form.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class IncidentFormPage implements OnInit {

  private incidenceService = inject(IncidenciesService);
  private employeeService = inject(EmployeeService);  
  private authService = inject(AuthService); 

  private route = inject(ActivatedRoute);
  private toastCtrl = inject(ToastController);
  private loadingCtrl= inject(LoadingController);
  private navCtrl = inject(NavController);  

  //DATAS
  incidents: Incidence[] = [];
  newIncident = this.initNewIncidentObject();   
  editingIncident: Incidence | null = null; 
  incidenceUnitFleet: number = 0; 
  incidentEmployeeDni: string = '';
  incidentEmployee: Employee | null = null;
  selectedIncident: Incidence | null = null;
  
  //STATES UI  
  isDeleteAlertOpen: boolean = false;  
  isEditing: boolean = false; 
  isAddingNew: boolean = false;
  incidentToDelete: Incidence | null = null;


  constructor ( ) {
    addIcons({ 
      'log-out-outline': logOutOutline,
      'add-outline': addOutline,
      'trash-outline': trashOutline,
      'create-outline': createOutline,
      'save-outline': 'save-outline',
      'close-outline': 'close-outline'
    });
  }
  
  ngOnInit() {    
    this.incidenceUnitFleet = Number(this.route.snapshot.paramMap.get('unitfleet')); 
    this.incidentEmployeeDni = String(this.route.snapshot.paramMap.get('dni_emp')); ;   
    this.newIncident.unitfleet = this.incidenceUnitFleet; // Asignamos el unitfleet al nuevo objeto para que se muestre en el formulario de creación 
    this.newIncident.dni_emp = this.incidentEmployeeDni; // Asignamos el dni del empleado logueado al nuevo objeto iincidencia
    this.loadIncidences(this.incidenceUnitFleet);
    this.loadIncidentEmployee(); // Cargamos los datos del empleado para mostrar su nombre en el formulario de creación
    console.log(`[DEBUG - INCIDENCIA PAGE] - ngOni:', employeeDNI: ${this.newIncident.dni_emp}, unitfleet: ${this.newIncident.unitfleet}`);
  }

  // Helper method to initialize a new incident object with default values
  private initNewIncidentObject() : Incidence{
    return {
      id: 0, // El backend asignará el ID real
      incidence_type: '',
      unitfleet: this.incidenceUnitFleet,
      dni_emp: this.incidentEmployeeDni,
      description: '',      
      date: new Date(),
      status: 'Pendiente'
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
    this.loadIncidentEmployee();
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
        this.showToast('Incidencia creada con éxito', 'success');        

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

  createIncident = async () => {
    if (!this.newIncident?.incidence_type || !this.newIncident?.description) {
      this.showToast('Completa los campos requeridos', 'warning');
      return;
    }
    const loading = await this.loadingCtrl.create({ message: 'Guardando...' });
    await loading.present();

    const incidenceToCreate: Incidence = {
      ...this.newIncident,
      incidence_type: this.newIncident.incidence_type,
      description: this.newIncident.description,
    };

    console.log('[DEBUG - INCIDENT FORM] - Incidencia a crear:', incidenceToCreate);

    this.incidenceService.createIncidence(incidenceToCreate).subscribe({
      next: () => {
        loading.dismiss();
        this.showToast('Incidencia creada con éxito', 'success');

        // 1. Recargamos los datos para que aparezca en la lista
        this.loadIncidences(this.incidenceUnitFleet);
        
        // 2. Cerramos el formulario de creación
        this.isAddingNew = false;
        
        // 3. Limpiamos el objeto por si quiere crear otra después
        this.newIncident = this.initNewIncidentObject();      
      },
      error: (e) => { 
        loading.dismiss();
        console.error('\n[ERROR 404] Error al crear la nueva incidencia:\n', e.error);
        this.showToast('Error al crear la nueva incidencia', 'danger'); 
      }
    });
  } 
  
  // --- HELPERS ---
  private async showToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000, color });
    toast.present();
  }

  private loadIncidentEmployee() {
      this.employeeService.getEmployeeByDni(this.incidentEmployeeDni).subscribe({
        next: (employee) => {
          console.log('[DEBUG - INCIDENCIA PAGE] - Devolucion de loadIncidentEmployee:', employee);
          this.incidentEmployee = employee;
          //this.incidenceUnitFleet = this.selectedIncident?.unitfleet || 0;          
        },
        error: (err) => {
          console.error('Error al cargar el empleado de la incidencia', err);
        }
      });
  }

  // --- NAVEGACION  ---
  goBack() {this.navCtrl.back();}
}