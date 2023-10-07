import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MetalsComponent } from './admin/metals/metals.component';
import { RegisterComponent } from './authentication/register/register.component';
import { LoginComponent } from './authentication/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuardGuard } from 'src/shared/authguard.guard';
import { UserListComponent } from './admin/user-list/user-list.component';
import { adminGuard } from 'src/shared/admin.guard';
import { OrderComponent } from './orderOps/order/order.component';
import { EditComponentComponent } from './admin/edit-component/edit-component.component';
import { ViewOrderComponent } from './orderOps/view-order/view-order.component';
import { UserOrdersComponent } from './orderOps/user-orders/user-orders.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';
import { CreatemetalComponent } from './admin/metals/createmetal/createmetal.component';

const routes: Routes = [
  {
component:HomepageComponent,
path:''
  },
  {
    component: DashboardComponent,
    path: 'DashBoard',
    canActivate: [authGuardGuard],
  },
  {
    component: RegisterComponent,
    path: 'Register',
  },
  {
    component: LoginComponent,
    path: 'Login',
  },
  {
    component: UserListComponent,
    path: 'Users',
    canActivate: [adminGuard],
  },
  {
    component: OrderComponent,
    path: 'createorder',
    canActivate:[authGuardGuard]
  },
  {
    component: MetalsComponent,
    path: 'allmetals',
    canActivate: [adminGuard],
  },
  {
    path: 'edit/:apiName/:id',
    component: EditComponentComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'ViewOrders',
    component: ViewOrderComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'UserOrders',
    component: UserOrdersComponent,
    canActivate: [adminGuard],
  },
  {
    path:'forgotPassword',
    component:ForgotPasswordComponent
  },
  {
    path:'createMetal',
    component:CreatemetalComponent,
    canActivate: [adminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
