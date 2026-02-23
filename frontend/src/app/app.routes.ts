import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'dota',
    loadComponent: () => import('./pages/dota/dota.page').then( m => m.DotaPage)
  },
  {
    path: 'admin',
    loadComponent: () => import('./pages/admin/admin.page').then( m => m.AdminPage)
  },
  {
    path: 'dota-detail/:unitfleet',
    loadComponent: () => import('./pages/dota-detail/dota-detail.page').then( m => m.DotaDetailPage)
  },


    {
    path: 'incidents',
    loadComponent: () => import('./pages/incidents/incidents.page').then( m => m.IncidentsPage)
  },
];
