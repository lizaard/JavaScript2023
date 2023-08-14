import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthComponent } from './auth.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { AuthResponseData } from '../model/interfaces';
describe('AuthComponent', () => {
  let authComponent: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockForm: NgForm;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, FormsModule, ReactiveFormsModule],
      providers: [HttpClient],
      declarations: [AuthComponent],
    });
    fixture = TestBed.createComponent(AuthComponent);
    authComponent = fixture.componentInstance;
    mockAuthService = jasmine.createSpyObj('AuthService', ['login', 'signUp']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockForm = { value: {}, valid: true, reset: () => {} } as NgForm;
    authComponent = new AuthComponent(mockAuthService, mockRouter);
    fixture.detectChanges();
  });

  it('ar trebui să schimbe modul între login și signup', () => {
    expect(authComponent.isLoginMode).toBeTrue();
    authComponent.onSwitchMode();
    expect(authComponent.isLoginMode).toBeFalse();
  });

  it('ar trebui să efectueze login corect', () => {
    const email = 'test@example.com';
    const password = 'testpassword';
    const mockAuthResponse: AuthResponseData = {
      idToken: '',
      email: '',
      refreshToken: '',
      expiresIn: '',
      localId: ''
    };
    mockAuthService.login.and.returnValue(of(mockAuthResponse));
    spyOn(mockForm, 'reset'); // Spionăm metoda reset pentru a verifica dacă este apelată

    authComponent.isLoginMode = true;
    mockForm.value.email = email;
    mockForm.value.password = password;

    authComponent.onSubmit(mockForm);

    expect(authComponent.isLoading).toBeFalse();
    expect(mockAuthService.login).toHaveBeenCalledWith(email, password);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/recipes']);
    expect(authComponent.error).toBeNull();
    expect(mockForm.reset).toHaveBeenCalled();
  });

  it('ar trebui să gestioneze eroare în cazul unei cereri de login eșuate', () => {
    const errorMessage = 'Eroare de autentificare';
    mockAuthService.login.and.returnValue(throwError(errorMessage));
    spyOn(mockForm, 'reset'); // Spionăm metoda resetForm pentru a verifica dacă este apelată

    authComponent.isLoginMode = true;

    authComponent.onSubmit(mockForm);

    expect(authComponent.isLoading).toBeFalse();
    expect(mockAuthService.login).toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
    expect(authComponent.error).toBe(errorMessage);
    expect(mockForm.reset).toHaveBeenCalled(); // Verificăm apelul metodei resetForm
  });
});
