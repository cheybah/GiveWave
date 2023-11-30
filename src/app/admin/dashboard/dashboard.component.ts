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
  potForm: FormGroup;
  potEditForm: FormGroup;
  selectedPot: Pot = {
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
    private formBuilder: FormBuilder
  ) {
    this.potForm = this.formBuilder.group({
      title: ['', Validators.required],
      category: [null, Validators.required],
      target_amount: ['', [Validators.required, Validators.min(1)]],
      deadline: ['', Validators.required],
      img_source: [''],
      description: ['', Validators.required]
    });
    this.potEditForm = this.formBuilder.group({
      title: ['', Validators.required],
      category: [null, Validators.required],
      target_amount: ['', [Validators.required, Validators.min(1)]],
      deadline: ['', Validators.required],
      description: ['', Validators.required]
    });
  }
  getUserPots(): void {
    this.potService.getUserPots(this.userId).subscribe(pots => {
      this.userPots = pots;
      console.log('list of pots :', this.userPots);
    });
  }
  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.authService.getUserById(this.userId).subscribe(user_db => {
      this.user = user_db;
    })
    this.getUserPots();
  }
  goToCreatePot(): void {
    this.scrollToSection('formpot');
  }
  onSubmitPot() {
    if (this.potForm.valid) {
      const newP = {
        id: null,
        title: this.potForm.value.title,
        description: this.potForm.value.description,
        category: this.potForm.value.category,
        target_amount: this.potForm.value.target_amount,
        current_amount: 0,
        owner: this.userId,
        contributors: [],
        img_source: this.potForm.value.img_source,
        deadline: this.potForm.value.deadline,
        start_date: new Date(),
      };

      this.potService.createPot(newP).subscribe((pot) => {
        console.log('pot added successfully', newP);
        this.scrollToSection('listeofpot');
        // Rafraîchir la liste des pots
        this.getUserPots();
      });
    } else {
      this.markFormGroupTouched(this.potForm);
    }
  }
  private markFormGroupTouched(formGroup: FormGroup) {
    (Object as any).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
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
    this.selectedPot = { ...pot };

    this.potEditForm.setValue({
      title: pot.title,
      category: pot.category,
      target_amount: pot.target_amount,
      deadline: pot.deadline,
      description: pot.description
    });
    const modalElement = document.getElementById('editPotModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }
  updatePot(): void {
    const formValues = this.potEditForm.value;

      // Update the selectedPot object
    this.selectedPot.title = formValues.title;
    this.selectedPot.category = formValues.category;
    this.selectedPot.target_amount = formValues.target_amount;
    this.selectedPot.deadline = formValues.deadline;
    this.selectedPot.description = formValues.description;
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
        this.potForm.value.img_source = imagePath;

        // You can log or display the imagePath if needed
        console.log('Selected Image Path:', imagePath);
    }
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
  isTitleCategoryDisabled(): boolean {
  // Return 'true' if the form is in edit mode, otherwise 'false'
  return !!this.selectedPot.id;
}
}
