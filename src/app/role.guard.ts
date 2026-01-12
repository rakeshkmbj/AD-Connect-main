import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';
import { map } from 'rxjs/operators';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Traverse up the route tree to find the expectedRole
  let expectedRoles: string[] | undefined;
  let currentRoute: ActivatedRouteSnapshot | null = route;

  while (currentRoute) {
    expectedRoles = currentRoute.data['expectedRole'];
    if (expectedRoles) break;
    currentRoute = currentRoute.parent;
  }

  if (!expectedRoles) {
    router.navigate(['/not-authorized']);
    return false;
  }

  return authService.userData$.pipe(
    map(userData => {
      if (userData) {
        const userRole = userData.admediA_ROLE_NAME;
        if (Array.isArray(expectedRoles) ? expectedRoles.includes(userRole) : userRole === expectedRoles) {
          return true;
        } else {
          router.navigate(['/not-authorized']);
          return false;
        }
      } else {
        router.navigate(['/not-authorized']);
        return false;
      }
    })
  );
};
