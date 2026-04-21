import { Routes } from '@angular/router';
import { authGuard } from '../auth/guards/auth-guard';

export const PRIVATE_ROUTES: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./main/main')
        .then(m => m.Main),
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard')
            .then(m => m.Dashboard)
      },
      {
        path: 'config-account',
        loadComponent: () =>
          import('./pages/config-account/config-account')
            .then(m => m.ConfigAccount)
      }
    ]
  }
];