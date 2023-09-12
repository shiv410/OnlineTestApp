import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string;
  password: string;
  error: string;

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login(this.email, this.password).subscribe(user => {
      if (user) {
        if (user.email === 'admin') {
          this.router.navigate(['/admin']);  // Redirect to admin page or dashboard
        } else {
          this.router.navigate(['/']);  // Redirect to the main or user dashboard page
        }
      } else {
        this.error = 'Invalid credentials';
      }
    });
  }
}


