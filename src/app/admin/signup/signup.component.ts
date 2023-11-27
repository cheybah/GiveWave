import { Component } from '@angular/core';
import {User} from "../../models/User";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  errorMessage: string = ''; // Add this line

  user: User = {
    id: Math.floor(1000 + Math.random() * 9000),
    name: '',
    lastname: '',
    email: '',
    password: '',
    bank_info: ''
  };

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  signUp(): void {
    if (this.validateForm()) {
      this.authService.signUp(this.user).subscribe(
        (user) => {
          console.log('User created', user.id);
          this.router.navigate(['/login']);
        },
        (error) => {
          console.log('Sign up failed', error);
          this.errorMessage = 'Sign up failed. Please check the required fields.';
        }
      );
    } else {
      this.errorMessage = 'Please fill out all required fields correctly.';
    }
  }

  validateForm(): boolean {
    if (!this.user.name || !this.user.lastname || !this.user.email || !this.user.password || !this.user.bank_info) {
      return false;
    }
    return true;
  }

  togglePasswordVisibility(): void {
    const passwordInput = document.querySelector('[name="password"]') as HTMLInputElement;
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
  }

  goToHome(): void {
    this.router.navigate(['/home']);
  }
  

}
