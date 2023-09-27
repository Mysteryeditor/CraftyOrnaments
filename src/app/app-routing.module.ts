import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MetalsComponent } from './metals/metals.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    component: DashboardComponent,
    path: 'DashBoard',
  },
  {
    component: RegisterComponent,
    path: 'Register',
  },
  {
    component:LoginComponent,
    path:'Login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
