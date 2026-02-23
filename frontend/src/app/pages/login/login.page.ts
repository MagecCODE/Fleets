import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { Employee } from 'src/app/models/employee.model';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
})
export class LoginPage {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private navCtrl: NavController,
    private employeeService: EmployeeService,
    private authService: AuthService
  ) {}

  login() {
    this.errorMessage = '';

    if (!this.username || !this.password) {
      this.errorMessage = 'Por favor, rellena todos los campos';
      return;
    }

    this.employeeService.login(this.username, this.password).subscribe({
      next: (response) => {
        console.log("[DEBUG - LOGIN] RESPUESTA LOGIN:", response);
        
        const user = response; 
        this.authService.setUser(user);
        
        // Redirección según rol
        switch (user.rol) {
          case 'Admin':
            this.navCtrl.navigateRoot('/admin');
            break;

          case 'Logistics':
          case 'Mro':
          case 'Sanitary':
            this.navCtrl.navigateRoot('/dota');
            break;
          default:
            console.warn("[DEBUG - LOGIN] Rol desconocido:", user.rol);
            this.navCtrl.navigateRoot('/login');
            break;
        }       
        
        //this.navCtrl.navigateRoot('/dota');

        //if (user.rol === 'Sanitary') { return this.navCtrl.navigateRoot('/unit');}
      },
      error: (err) => {
        if (err.status === 401) {
          this.errorMessage = 'Usuario o contraseña incorrectos';
        } else {
          this.errorMessage = 'Error al conectar con el servidor';
        }
      }
    });
  }
}