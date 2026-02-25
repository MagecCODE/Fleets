import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController, ToastController } from '@ionic/angular';
import { IncidenciesService } from 'src/app/services/incidence/incidencies.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Incidence } from 'src/app/models/incidence.model';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { addIcons } from 'ionicons';
import { logOutOutline, addOutline, trashOutline, createOutline } from 'ionicons/icons';

@Component({
  selector: 'app-incidents',
  templateUrl: './incidents.page.html',
  styleUrls: ['./incidents.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class IncidentsPage implements OnInit {
  private incidenceService = inject(IncidenciesService);
  private authService = inject(AuthService);
  private employeeService = inject(EmployeeService);
  private toastCtrl = inject(ToastController);


  isDeleteAlertOpen = false;
  incidentToDelete: Incidence | null = null;

  incidents: Incidence[] = [];
  selectedIncident: Incidence | null = null;
  
  isEditing = false;
  editingIncident: Incidence | null = null;

  incidentEmployee: Employee | null = null;

  constructor(private navCtrl: NavController) {
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
    this.loadIncidents();
  }

  loadIncidents() {
    this.incidenceService.getIncidencies().subscribe({
      next: (data) => {
        this.incidents = data;
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
        this.showToast('Incidencia actualizada con éxito', 'success'); 
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
        this.showToast('Error al actualizar la incidencia', 'danger');
        console.error('Error al actualizar la incidencia', err);
      }
    });
  }

  logout() {
    this.authService.logout();
    this.navCtrl.navigateRoot('/login');
  }

    // --- HELPERS ---
  private async showToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000, color });
    toast.present();
  }

  private loadIncidentEmployee() {
    if (this.selectedIncident) {
      this.employeeService.getEmployeeByDni(this.selectedIncident.dni_emp).subscribe({
        next: (employee) => {
          console.log('[DEBUG - INCIDENCIA PAGE] - Devolucion de loadIncidentEmployee:', employee);
          this.incidentEmployee = employee;
        },
        error: (err) => {
          console.error('Error al cargar el empleado de la incidencia', err);
        }
      });
    }
  }
}