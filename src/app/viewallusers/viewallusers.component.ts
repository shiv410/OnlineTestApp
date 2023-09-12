import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-viewallusers',
  templateUrl: './viewallusers.component.html',
  styleUrls: ['./viewallusers.component.css']
})
export class ViewallusersComponent implements OnInit {

  userinfo: Observable<any>;

  constructor(
    private userservice: UserService,
    private router: Router
  ) { }

  viewAllUsers() {
    this.userinfo = this.userservice.ViewAllUsersDetails();
  }

  ngOnInit(): void {
    // this method will be executed only once when page is initlized
    this.viewAllUsers();
  }

  delUser(id: any) {
    this.userservice.DeleteUserById(id).subscribe(data => {
      this.viewAllUsers();
    });
  }

}
