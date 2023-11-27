import {Component, OnInit} from '@angular/core';
import {PotService} from "../../services/pot.service";
import {ActivatedRoute,Router} from "@angular/router";
import {Pot} from "../../models/Pot";
import {User} from "../../models/User";
import {AuthService} from "../../services/auth.service";
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  userId: number = 0;
  user: User = {
    id: 0,
    name: '',
    lastname: '',
    email: '',
    password: '',
    bank_info: '',
  };
  userPots: Pot[]= [];
  newPot: Pot = {
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
  selectedPot: Pot = {...this.newPot};

  constructor(
    private route: ActivatedRoute,
    private potService: PotService,
    private authService: AuthService,
    private router: Router
  ) {}

  getUserPots(): void {
    this.potService.getUserPots(this.userId).subscribe(pots => {
      this.userPots = pots;
      console.log(this.userPots);
    });
  }

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.authService.getUserById(this.userId).subscribe(user_db => {
      this.user = user_db;
    })
    this.getUserPots();
  }

  createPot(): void {
    this.scrollToSection('formpot');
  }
  onSubmitPot() {
    // this.newPot.id = Math.floor(1000 + Math.random() * 9000);
    this.newPot.owner = this.userId;

    this.potService.createPot(this.newPot).subscribe(pot =>{
      console.log('pot added successfully');
      this.scrollToSection('listeofpot');

      // Rafraîchir la liste des pots
      this.getUserPots();

    });
  }
  displayPot(pot: Pot): void {
    this.selectedPot = pot;
    const modalElement = document.getElementById('potModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }
  OpenEditPot(pot: Pot): void {
    this.selectedPot = {...pot};
    const modalElement = document.getElementById('editPotModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }
  updatePot(): void {
    this.potService.updatePot(this.selectedPot).subscribe(() => {
      console.log('Pot updated successfully');
      this.getUserPots();
      const modalElement = document.getElementById('editPotModal');
      if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.hide();
      }
    });
  }
  deletePot(pot: Pot): void {
    this.potService.deletePot(pot.id).subscribe(() => {
      console.log('Pot deleted successfully');
      this.getUserPots();
    });
  }
  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  goToHome(): void {
    this.router.navigate(['/home']);
  }

}
