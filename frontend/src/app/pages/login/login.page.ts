import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, NavController } from '@ionic/angular';

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
    private router: Router,
    private navCtrl: NavController,
  ) {}

  login() {
    this.errorMessage = '';
    if (!this.username || !this.password) {
      this.errorMessage = 'Por favor, rellena todos los campos';
      return;
    }
  }
}