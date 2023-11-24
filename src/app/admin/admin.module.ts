import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignupComponent } from './signup/signup.component';
import {HomeModule} from "../home/home.module";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    LoginComponent,
    DashboardComponent,
    SignupComponent,


  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HomeModule,
    FormsModule,

  ]
})
export class AdminModule { }
