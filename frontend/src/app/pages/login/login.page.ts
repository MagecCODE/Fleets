import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { EmployeeService } from 'src/app/services/employee.service';
import { AuthService } from 'src/app/services/auth.service';

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

    this.employeeService.getEmployees().subscribe({
      next: (employees) => {
        const user = employees.find(
          (e) => (e.name === this.username || e.dni === this.username)
        );

        if (user) {
          // In a real app, we would verify password here
          this.authService.setUser(user);
          this.navCtrl.navigateRoot('/unit');
        } else {
          this.errorMessage = 'Usuario o contraseña incorrectos';
        }
      },
      error: () => {
        this.errorMessage = 'Error al conectar con el servidor';
      }
    });
  }
}