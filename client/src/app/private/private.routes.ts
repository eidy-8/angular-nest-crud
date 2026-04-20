import { Routes } from '@angular/router';

export const PRIVATE_ROUTES: Routes = [
  {
    path: '',
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