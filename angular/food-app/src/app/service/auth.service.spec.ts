import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';
import { AuthResponseData } from '../model/interfaces';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

fdescribe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule],
      providers: [AuthService, HttpClient],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('ar trebui să trimită o solicitare POST la server cu datele de autentificare', () => {
    const email = 'test@example.com';
    const password = 'testpassword';
    const authResponseData: AuthResponseData = {
      email: email,
      localId: 'localId',
      idToken: 'idToken',
      expiresIn: '3600',
      refreshToken: '',
    };

    service.login(email, password).subscribe((response) => {
      expect(response.email).toBe(email);
      expect(response.localId).toBe(authResponseData.localId);
      expect(response.idToken).toBe(authResponseData.idToken);
    });

    const request = httpMock.expectOne(service.loginLink);
    expect(request.request.method).toBe('POST');
    request.flush(authResponseData);
  });

  it('ar trebui să apeleze handleError în caz de eroare', () => {
    const email = 'test@example.com';
    const password = 'testpassword';

    service
      .login(email, password)
      .pipe(
        catchError((error) => {
          expect(error).toBeTruthy();
          return [];
        }),
      )
      .subscribe();
    catchError((error) => {
      httpMock.expectOne(service.loginLink);
      return throwError(() => error);
    });
  });

  it('ar trebui să apeleze handleAuthentication corect', () => {
    const email = 'test@example.com';
    const password = 'testpassword';
    const authResponseData: AuthResponseData = {
      email: email,
      localId: 'localId',
      idToken: 'idToken',
      expiresIn: '3600',
      refreshToken: '',
    };

    spyOn(service, 'handleAuthentification');

    service.login(email, password).subscribe();

    const request = httpMock.expectOne(service.loginLink);
    request.flush(authResponseData);

    expect(service.handleAuthentification).toHaveBeenCalledWith(
      authResponseData.email,
      authResponseData.localId,
      authResponseData.idToken,
      Number(authResponseData.expiresIn),
    );
  });
});
