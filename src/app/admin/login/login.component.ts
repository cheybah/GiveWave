import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css'
]
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  signIn(): void {
    this.authService.signIn(this.email, this.password).subscribe(users => {
      if (users.length > 0) {
        console.log('User authenticated', users[0].id);
        this.router.navigate(['/dashboard', users[0].id]);
      } else {
        console.log('Invalid email or password');
        // Show an error message
      }
    });
  }

}
