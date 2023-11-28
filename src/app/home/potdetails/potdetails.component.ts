import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { PotService } from '../../services/pot.service';
import { Pot } from '../../models/Pot';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-pot-details',
  templateUrl: './potdetails.component.html',
  styleUrls: ['./potdetails.component.css']
})
export class PotdetailsComponent implements OnInit {
  pot: Pot = {
    id: 0,
    title: '',
    description: '',
    category: '',
    target_amount: 0,
    current_amount: 0,
    owner: 0, //User
    contributors: [], // Contributor
    img_source: '',
    deadline: new Date(),
    start_date: new Date(),
  };
  donationForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private potService: PotService,
    private router: Router
  ) {
    this.donationForm = this.formBuilder.group({
      contribution: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    // @ts-ignore
    const id = +this.route.snapshot.paramMap.get('id');
    this.potService.getPotById(id).subscribe(pot => {
      this.pot = pot;
      console.log(this.pot);
    });
  }
  redirectToClickToPay() {
    const donationAmount = this.donationForm.get('contribution')?.value;
    this.router.navigate(['/click-to-pay', this.pot.id], { queryParams: { contribution: donationAmount } });
  }
  calculateProgress(pot: any): string {
    const progress = (pot.current_amount / pot.target_amount) * 100;
    return progress + '%';
  }

  goToHome(): void {
    this.router.navigate(['/home']);
  }
}
