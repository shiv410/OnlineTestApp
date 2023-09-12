import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { SubjectService } from '../subject.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  userData: any;
  Object = Object;

  constructor(private authService: AuthService, private subjectService: SubjectService) { }

  ngOnInit(): void {
    const userId = this.authService.currentUserValue.id;
    this.subjectService.getUserDetails(userId).subscribe(data => {
      this.userData = data;
    });
  }


}
