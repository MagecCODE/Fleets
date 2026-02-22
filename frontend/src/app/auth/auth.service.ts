import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser: any = null;

  constructor() {
    // Attempt to load user from localStorage on init
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUser = JSON.parse(savedUser);
    }
  }

  setUser(user: any) {
    this.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getUser() {
    return this.currentUser;
  }

  getEmployeeId(): number | null {
    return this.currentUser ? this.currentUser.id : null;
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }
}
