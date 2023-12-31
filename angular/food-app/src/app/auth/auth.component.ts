import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Observable } from 'rxjs';
import { AuthResponseData } from '../model/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string = null;
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signUp(email, password);
    }
    authObs.subscribe({
      next: (resp) => {
        console.log(resp);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      error: (errorMessage) => {
        console.log(errorMessage);

        this.error = errorMessage;
        this.isLoading = false;
      },
    });

    form.reset();
  }
}
