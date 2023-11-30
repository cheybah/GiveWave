import {Component, OnInit} from '@angular/core';
import {PotService} from "../../services/pot.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Pot} from "../../models/Pot";
import {AuthService} from "../../services/auth.service";
import {User} from "../../models/User";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ContributorService} from "../../services/contributor.service";

@Component({
  selector: 'app-clicktopayform',
  templateUrl: './clicktopayform.component.html',
  styleUrls: ['./clicktopayform.component.css','./form-validation.css']
})
export class ClicktopayformComponent implements OnInit{

  potId: number = 0;
  contributionAmount: number = 0;
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
  paymentForm: FormGroup;


  constructor(
    private route: ActivatedRoute,
    private potService: PotService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private contributorService: ContributorService,
    private router: Router
  ) {
    this.paymentForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z \s]*$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z \s]*$/)]],
      email: ['', [Validators.required, Validators.pattern(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      saveInfo: [false],
      paymentMethod: ['credit', Validators.required],
      ccName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z \s]*$/)]],
      ccNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]], // 16 digits for credit card number
      ccExpiration: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]], // MM/YY format
      ccCvv: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]], // 3 digits for CVV
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.potId = +params['id'];
    });
    this.route.queryParams.subscribe(queryParams => {
      this.contributionAmount = +queryParams['contribution'];
    });
    this.potService.getPotById(this.potId).subscribe(pot => {
      this.pot = pot;
      console.log(this.contributionAmount);
      console.log(this.pot);
    });
  }

  submitForm() {
    const contributorData = {
      id: null,
      name: this.paymentForm.value.firstName + ' ' + this.paymentForm.value.lastName,
      email: this.paymentForm.value.email,
      bank_info: this.paymentForm.value.ccNumber, // Replace with actual bank_info logic
      donation_amount: this.contributionAmount,
      pot_id: this.potId
    };

    this.contributorService.addContributor(contributorData).subscribe(
      (newContributor: any) =>
      {
        this.pot.current_amount +=  this.contributionAmount;
        this.pot.contributors.push(newContributor.id);
        this.potService.updatePot(this.pot).subscribe(
          () => {
            // Pot updated successfully
            // Navigate back to home page
            this.router.navigate(['/home']);
          }
        )
      });


  }
}
