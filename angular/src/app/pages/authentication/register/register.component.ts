import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-register',
  styleUrls: ["./register.component.scss"],
  templateUrl: './register.component.html',
})
export class AppSideRegisterComponent {
  errorMessage: any;
  showError: boolean = false;
  constructor(private router: Router, public authService: AuthenticationService) { }
  emailRegEx = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  strongPasswordRegx: RegExp =
    /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;
  phoneRegEx = '^d{10}$';
  submitted = false;

  form = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.maxLength(10)
    ])
  });

  registerForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(this.emailRegEx),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(this.strongPasswordRegx),
    ]),
    phoneno: new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
    ]),
  });

  sumbitRegisterForm() {
    this.submitted = true;
    console.log(this.registerForm.value);
    this.authService.createUser(this.registerForm.value).subscribe((res: any) => {
      if (res.status == 200) {
        this.router.navigate(['/dashboardpage'])
      } else {
        this.showError = true;
        this.errorMessage = res.messge
      }
    })
  }
  get registerFormControl() {
    return this.registerForm.controls;
  }
}
