import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MetalsComponent } from './admin/metals/metals.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './authentication/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { LoginComponent } from './authentication/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserListComponent } from './admin/user-list/user-list.component';
import { DataTablesModule } from 'angular-datatables'
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import { OrderComponent } from './orderOps/order/order.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { AgGridModule } from 'ag-grid-angular';
import { CrudRenderComponent } from './admin/crud-render/crud-render.component';
import { EditComponentComponent } from './admin/edit-component/edit-component.component';
import { ViewOrderComponent } from './orderOps/view-order/view-order.component';
import { UserOrdersComponent } from './orderOps/user-orders/user-orders.component';
import { HomepageComponent } from './homepage/homepage.component';
import { DatePipe } from '@angular/common';
import { GridApi } from 'ag-grid-community';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';
import { ImageuploadComponent } from './imageupload/imageupload.component';
import { CreatemetalComponent } from './admin/metals/createmetal/createmetal.component';
import { DoughnutchartComponent } from './dashboard/doughnutchart/doughnutchart.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { SkeletonModule } from 'primeng/skeleton';
import { FooterComponent } from './footer/footer.component';
@NgModule({
  declarations: [AppComponent, MetalsComponent, NavbarComponent, RegisterComponent, LoginComponent, DashboardComponent, UserListComponent, OrderComponent, CrudRenderComponent, EditComponentComponent, ViewOrderComponent, UserOrdersComponent, HomepageComponent, ForgotPasswordComponent, ImageuploadComponent, CreatemetalComponent, DoughnutchartComponent, FooterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatRadioModule,
    DataTablesModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatStepperModule,
    MatSelectModule,
    AgGridModule,
    MatButtonModule,
    ToastModule,
    SkeletonModule

  ],
  providers: [ DatePipe,GridApi,MessageService],
  bootstrap: [AppComponent],
})
export class AppModule { }
