import { CanActivateFn } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const role = localStorage.getItem('role');
  if(role && role.toLowerCase()=='admin'){
    return true;

  }
  alert('sorry');//change
  return false;
};
