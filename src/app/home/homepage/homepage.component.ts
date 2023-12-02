import {Component, Renderer2, ElementRef, OnInit} from '@angular/core';
import {Pot} from "../../models/Pot";
import {PotService} from "../../services/pot.service";


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit{
  pots: Pot[] = [];
  constructor(private potService: PotService) { }
  ngOnInit(): void {
    this.potService.getPots().subscribe(pots => {
      this.pots = pots;
      console.log('its from homepage',this.pots);
    });
  }
  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
