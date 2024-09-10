import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class AppSideLoginComponent {
  showError: boolean = false;
  errorMessage: any;
  constructor(public authService: AuthenticationService, public router: Router) { }
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  login() {
    console.log(this.loginForm)
    this.authService.createUser(this.loginForm.value).subscribe((res: any) => {
      if (res.status == 200) {
        this.router.navigate(['/dashboardpage'])
        this.authService.token = res.token
      } else {
        this.showError = true;
        this.errorMessage = res.messge
      }
    })
  }
}
