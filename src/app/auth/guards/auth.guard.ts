import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  CanMatchFn,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authCanActivateGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot) => {
  return checkAuthStatus();
}

export const authCanMatchGuard: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => {
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
