import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./public/public.routes').then(m => m.PUBLIC_ROUTES)
    },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.routes').then(m => m.AUTH_ROUTES)
    },
    {
        path: 'user',
        loadChildren: () => import('./private/private.routes').then(m => m.PRIVATE_ROUTES)
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: ''
    },
    {
        path: '**',
        redirectTo: ''
    }
];
