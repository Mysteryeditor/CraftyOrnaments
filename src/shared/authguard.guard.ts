import { CanActivateFn,Router } from '@angular/router';
import { inject } from '@angular/core';
export const authGuardGuard: CanActivateFn = (route, state) => {
  const userId = localStorage.getItem('activeUserId');
  const router = inject(Router);

  if (userId) {
    return true;
  }
  else{
  router.navigate(['/Login']);
  return false;
}
};