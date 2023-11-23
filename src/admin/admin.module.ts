import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage/homepage.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const adminRoutes: Routes = [
  { path: 'homepage', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'homepage', pathMatch: 'full' },
  // Add more routes for admin functionality as needed
];

@NgModule({
  declarations: [
    HomepageComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(adminRoutes)
  ]
})
export class AdminModule { }
