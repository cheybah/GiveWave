import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { PublicpotsComponent } from './publicpots/publicpots.component';
import { PotdetailsComponent } from './potdetails/potdetails.component';
import { SeparatorComponent } from './separator/separator.component';
import { HowitworksComponent } from './howitworks/howitworks.component';


@NgModule({
  declarations: [
    HomepageComponent,
    FooterComponent,
    NavbarComponent,
    TopbarComponent,
    ContactComponent,
    AboutComponent,
    PublicpotsComponent,
    PotdetailsComponent,
    SeparatorComponent,
    HowitworksComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
