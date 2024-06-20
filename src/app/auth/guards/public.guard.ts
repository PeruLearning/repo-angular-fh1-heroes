import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const publicCanActivateGuard: CanActivateFn = (route, state) => {
  return checkAuthStatus();
};

export const publicCanMatchGuard: CanMatchFn = (route, segments) => {
  return checkAuthStatus();
}

const checkAuthStatus = (): Observable<boolean> => {
  const service: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return service.checkAuthenticationStatus()
    .pipe(
      tap((isAuthenticated) => {
        if (isAuthenticated) {
          router.navigateByUrl('/');
        }
      }),
      map(() => true)
    );
};