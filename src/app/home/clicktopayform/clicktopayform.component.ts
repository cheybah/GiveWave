import { Component } from '@angular/core';
import {PotService} from "../../services/pot.service";
import {ActivatedRoute} from "@angular/router";
import {Pot} from "../../models/Pot";

@Component({
  selector: 'app-clicktopayform',
  templateUrl: './clicktopayform.component.html',
  styleUrls: ['./clicktopayform.component.css','./form-validation.css']
})
export class ClicktopayformComponent {

  // @ts-ignore
  pot: Pot;

  constructor(
    private route: ActivatedRoute,
    private potService: PotService
  ) { }

  ngOnInit(): void {
    // @ts-ignore
    const id = +this.route.snapshot.paramMap.get('id');
    this.potService.getPotById(id).subscribe(pot => {
      this.pot = pot;
      console.log(this.pot);
    });
  }

  

}
