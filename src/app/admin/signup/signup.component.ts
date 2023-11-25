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
    this.authService.signUp(this.user).subscribe(user => {
      console.log('User created', user.id);
      this.router.navigate(['/login']);
    });

  }

}
