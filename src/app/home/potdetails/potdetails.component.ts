import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { PotService } from '../../services/pot.service';
import { Pot } from '../../models/Pot';

@Component({
  selector: 'app-pot-details',
  templateUrl: './potdetails.component.html',
  styleUrls: ['./potdetails.component.css']
})
export class PotdetailsComponent implements OnInit {
  // @ts-ignore
  pot: Pot;

  constructor(
    private route: ActivatedRoute,
    private potService: PotService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // @ts-ignore
    const id = +this.route.snapshot.paramMap.get('id');
    this.potService.getPotById(id).subscribe(pot => {
      this.pot = pot;
      console.log(this.pot);
    });
  }

  redirectToClickToPay() {
    this.router.navigate(['/click-to-pay', this.pot.id]);
  }

  calculateProgress(pot: any): string {
    const progress = (pot.current_amount / pot.target_amount) * 100;
    return progress + '%';
  }

  goToHome(): void {
    this.router.navigate(['/home']);
  }
}
