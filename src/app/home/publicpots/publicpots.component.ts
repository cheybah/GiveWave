import {Component, Input, OnInit} from '@angular/core';
import { Pot } from '../../models/Pot';
import { PotService } from '../../services/pot.service';

@Component({
  selector: 'app-publicpots',
  templateUrl: './publicpots.component.html',
  styleUrls: ['./publicpots.component.css']
})
export class PublicpotsComponent implements OnInit {
  @Input() pubPots: Pot[] =[];

  constructor(private potService: PotService) { }

  ngOnInit(): void { }

  // Inside your component class
  calculateProgress(pot: any): string {
  const progress = (pot.current_amount / pot.target_amount) * 100;
  return progress + '%';
  }

}
