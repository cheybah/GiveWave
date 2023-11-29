import {Component, OnInit} from '@angular/core';
import {PotService} from "../../services/pot.service";
import {ActivatedRoute,Router} from "@angular/router";
import {Pot} from "../../models/Pot";
import {User} from "../../models/User";
import {AuthService} from "../../services/auth.service";
import * as bootstrap from 'bootstrap';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'; // Import FormBuilder and FormGroup


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

  potForm: FormGroup;

  

  categories = [
    { id: 'categoryAnimal', value: 'Animal', label: 'Animal' },
    { id: 'categorySports', value: 'Sports', label: 'Sports' },
    { id: 'categoryEducation', value: 'Education', label: 'Education' },
    { id: 'categoryWedding', value: 'Wedding', label: 'Wedding' },
  ];

  constructor(
    private route: ActivatedRoute,
    private potService: PotService,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder // Inject FormBuilder in the constructor
  ) {
    this.potForm = this.formBuilder.group({
      target_amount: ['', [Validators.required, Validators.min(1)]],
      title: ['', [Validators.required]]
        });
  }

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
    // Open the confirmation modal
    const confirmationModalElement = document.getElementById('confirmationModal');
    if (confirmationModalElement) {
      const confirmationModal = new bootstrap.Modal(confirmationModalElement);
      confirmationModal.show();
    }
  }
  
  confirmUpdate(): void {
    // Call the actual update function
    this.potService.updatePot(this.selectedPot).subscribe(() => {
      console.log('Pot updated successfully');
      this.getUserPots();
  
      // Hide the edit modal
      const editModalElement = document.getElementById('editPotModal');
      if (editModalElement) {
        const editModal = new bootstrap.Modal(editModalElement);
        editModal.hide();
      }
    });
  }
  
  deletePot(pot: Pot): void {
    // Set the selected pot for deletion
    this.selectedPot = pot;
  
    // Open the confirmation modal
    const deleteModalElement = document.getElementById('deleteModal');
    if (deleteModalElement) {
      const deleteModal = new bootstrap.Modal(deleteModalElement);
      deleteModal.show();
    }
  }
  
  confirmDelete(): void {
    // Call the actual delete function
    if (this.selectedPot) {
      this.potService.deletePot(this.selectedPot.id).subscribe(() => {
        console.log('Pot deleted successfully');
        this.getUserPots();
      });
    }
    // Close the confirmation modal
    const deleteModalElement = document.getElementById('deleteModal');
    if (deleteModalElement) {
      const deleteModal = new bootstrap.Modal(deleteModalElement);
      deleteModal.hide();
    }
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

  logOut(): void {
    this.router.navigate(['/login']);
  }

  onFileSelected(event: any): void {
    const fileInput = event.target;
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        // Assuming you have an "assets" folder in the root of your Angular project
        const imagePath = `../assets/img/${file.name}`;
        this.newPot.img_source = imagePath;

        // You can log or display the imagePath if needed
        console.log('Selected Image Path:', imagePath);
    }
}

onCheckboxChange(category: string) {
  this.newPot.category = category;
}

calculateProgress(pot: any): string {
  const progress = (pot.current_amount / pot.target_amount) * 100;
  return progress + '%';
}

minDate(): string {
  // Get the current date
  const currentDate = new Date();

  // Format the date as "YYYY-MM-DD"
  const formattedDate = currentDate.toISOString().split('T')[0];

  return formattedDate;
}




}
