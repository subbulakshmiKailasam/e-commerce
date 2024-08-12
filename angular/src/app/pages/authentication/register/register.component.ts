import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class AppSideRegisterComponent {
  constructor(private router: Router) {}

  registerForm = new FormGroup({
    uname: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    phoneno: new FormControl('', [Validators.required,Validators.minLength(10)]),
  });


  sumbitRegisterForm() {
   console.log(this.registerForm)
  }
}
