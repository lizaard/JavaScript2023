import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AuthService } from './service/auth.service';
import { HeaderComponent } from './header/header.component';
import { of } from 'rxjs';
describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  beforeEach(() => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['autoLogin']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [AppComponent, HeaderComponent],
      providers: [
        HttpClient,
        { provide: AuthService, useValue: mockAuthService },
      ],
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('ar trebui să apeleze autoLogin la inițializare', () => {
    // mockAuthService.autoLogin.and.returnValue(of(null)); // Folosim of(null) pentru a crea un Observable gol

    component.ngOnInit();

    expect(mockAuthService.autoLogin).toHaveBeenCalled();
  });
});
