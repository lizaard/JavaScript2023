import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { AuthResponseData } from '../model/interfaces';
import { User } from '../model/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token: string = null;
  authLink: string = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.token}`;
  loginLink: string = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.token}`;
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;
  // userToken:string = null;
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(this.authLink, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleError),
        tap((respData) => {
          this.handleAuthentification(
            respData.email,
            respData.localId,
            respData.idToken,
            Number(respData.expiresIn),
          );
        }),
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(this.loginLink, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleError),
        tap((respData) => {
          this.handleAuthentification(
            respData.email,
            respData.localId,
            respData.idToken,
            Number(respData.expiresIn),
          );
        }),
      );
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUsers = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate),
    );

    if (loadedUsers.token) {
      this.user.next(loadedUsers);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  handleAuthentification(
    email: string,
    userId: string,
    token: string,
    expiresIn: number,
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'an eror ocuurer';
    if (!errorResponse?.error || !errorResponse?.error.error) {
      return throwError(() => errorMessage);
    }
    if (errorResponse.error.error.message == 'EMAIL_EXISTS') {
      errorMessage = 'This email is already exists';
    }
    if (errorResponse.error.error.message == 'EMAIL_NOT_FOUND') {
      errorMessage = 'This email is does not exist';
    }
    if (errorResponse.error.error.message == 'INVALID_PASSWORD') {
      errorMessage = 'Password invalid';
    }
    return throwError(() => errorMessage);
  }
}
