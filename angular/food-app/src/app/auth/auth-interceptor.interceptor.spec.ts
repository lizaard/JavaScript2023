import { TestBed } from '@angular/core/testing';

import { AuthInterceptorInterceptor } from './auth-interceptor.interceptor';
import { HttpClientModule, HttpClient } from '@angular/common/http'
describe('AuthInterceptorInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [ HttpClientModule],
      providers: [AuthInterceptorInterceptor,HttpClient],
    }),
  );

  it('should be created', () => {
    const interceptor: AuthInterceptorInterceptor = TestBed.inject(
      AuthInterceptorInterceptor,
    );
    expect(interceptor).toBeTruthy();
  });
});
