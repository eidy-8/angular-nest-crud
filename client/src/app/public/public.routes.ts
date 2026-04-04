import { Routes } from '@angular/router';

export const PUBLIC_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./main/main')
        .then(m => m.Main),
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home')
            .then(m => m.Home)
      },
    ]
  }
];