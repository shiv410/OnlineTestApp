import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'OnlineTestApplication';

  constructor(public authService: AuthService, private router: Router) { }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  isAdmin: boolean = false;
  isUser: boolean = false;

  ngDoCheck() {
    let currenturl = this.router.url;
    console.log(currenturl);

    if (currenturl == "/admin" || currenturl == "/viewall" || currenturl == "/addque") {
      this.isAdmin = true;
      this.isUser = false
    } else if (currenturl == "/") {
      this.isAdmin = false;
      this.isUser = true;
    }

  }

}
