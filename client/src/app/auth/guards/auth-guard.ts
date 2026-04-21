import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(Auth);
  const router = inject(Router);

  const isAuth = await authService.isAuthenticated();
  if (!isAuth) {
    router.navigate(['auth/login']);
    return false;
  }
  return true;
};
