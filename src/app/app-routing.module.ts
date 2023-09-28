import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MetalsComponent } from './metals/metals.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuardGuard } from 'src/shared/authguard.guard';
import { UserListComponent } from './admin/user-list/user-list.component';
import { adminGuard } from 'src/shared/admin.guard';

const routes: Routes = [
  {
    component: DashboardComponent,
    path: 'DashBoard',
    canActivate:[authGuardGuard]
  },
  {
    component: RegisterComponent,
    path: 'Register',
  },
  {
    component:LoginComponent,
    path:'Login'
  },
  {
    component:UserListComponent,
    path:'Users',
    canActivate:[adminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
