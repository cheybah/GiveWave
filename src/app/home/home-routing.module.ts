import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomepageComponent} from "./homepage/homepage.component";
import {PotdetailsComponent} from "./potdetails/potdetails.component";
import {ClicktopayformComponent} from "./clicktopayform/clicktopayform.component";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomepageComponent },
  { path: 'pot-details/:id', component: PotdetailsComponent },
  { path: 'click-to-pay/:id' , component: ClicktopayformComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
