import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./main/main')
        .then(m => m.Main),
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/login/login')
            .then(m => m.Login)
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./pages/register/register')
            .then(m => m.Register)
      }
    ]
  }
];