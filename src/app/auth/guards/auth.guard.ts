import {
  CanActivateFn,
  CanMatchFn,
  Router,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authCanActivateGuard: CanActivateFn = (route, state) => {
  return checkAuthStatus();
}

export const authCanMatchGuard: CanMatchFn = (route, segments) => {
  return checkAuthStatus();
};

const checkAuthStatus = (): Observable<boolean> => {
  const service: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return service.checkAuthenticationStatus()
    .pipe(
      tap((isAuthenticated) => console.log('Authenticated: ', isAuthenticated)),
      tap((isAuthenticated) => {
        if (!isAuthenticated) {
          router.navigateByUrl('auth/login');
        }
      })
    );
};
