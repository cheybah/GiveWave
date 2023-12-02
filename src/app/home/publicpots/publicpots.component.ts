import { Component, OnInit } from '@angular/core';
import { Pot } from '../../models/Pot';
import { PotService } from '../../services/pot.service';

@Component({
  selector: 'app-publicpots',
  templateUrl: './publicpots.component.html',
  styleUrls: ['./publicpots.component.css']
})
export class PublicpotsComponent implements OnInit {
  pots: Pot[] = [];

  constructor(private potService: PotService) { }

  ngOnInit(): void {
    this.potService.getPots().subscribe(pots => {
      this.pots = pots;
      console.log(this.pots);
    });
  }

  // Inside your component class
  calculateProgress(pot: any): string {
  const progress = (pot.current_amount / pot.target_amount) * 100;
  return progress + '%';
  }

}
