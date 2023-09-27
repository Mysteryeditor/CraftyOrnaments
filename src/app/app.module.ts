import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MetalsComponent } from './metals/metals.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
 import { MatFormFieldModule } from '@angular/material/form-field';
 import {MatInputModule} from '@angular/material/input';
 import {MatRadioModule} from '@angular/material/radio';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [AppComponent, MetalsComponent, NavbarComponent, RegisterComponent, LoginComponent, DashboardComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatRadioModule

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
