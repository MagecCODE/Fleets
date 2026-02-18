import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: '',
    redirectTo: 'unit',
    pathMatch: 'full',
  },
  {
    path: 'unit',
    loadComponent: () => import('./pages/unit/unit.page').then( m => m.UnitPage)
  },
];
