import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard = () => {
  const router = inject(Router);

  const token = localStorage.getItem('contellect_token');

  if (token) {
    return true;
  }

  router.navigate(['/auth/login']);
  return false;
};
