import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  msg: string = "";

  constructor(
    private builder: FormBuilder,
    private router: Router,
    private userservice: UserService
  ) { }

  userform = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })


  CreateNewUser() {
    if (this.userform.valid) {
      this.userservice.AddNewUser(this.userform.value).subscribe(data => {
        // this.router.navigate(['/viewall']);
        alert("Registered successfully...");
        this.userform.reset();
        this.router.navigate(["/"]);
      })

    } else {
      alert("Invalid Form");
    }
  }

}
