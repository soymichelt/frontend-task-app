import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { of } from 'rxjs';

import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from './../../services/auth.service';

describe('AuthInterceptor tests', () => {
  const TOKEN_TESTING = 'my-firebase-token';

  let authService: AuthService;
  let httpMock: HttpTestingController;
  let httpClientMock: HttpClient;

  beforeEach(() => {
    const getAuthTokenSpy = jasmine
      .createSpy('getAuthToken')
      .and.returnValue(of(TOKEN_TESTING));

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: AuthService, useValue: { getAuthToken: getAuthTokenSpy } },
      ],
    });

    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClientMock = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Should add Authorization header with token', () => {
    const requestUrl = '/api/tasks';
    httpClientMock.get(requestUrl).subscribe();

    const req = httpMock.expectOne(requestUrl);
    const { headers } = req.request;

    expect(headers.has('Authorization')).toBeTruthy();
    expect(headers.get('Authorization')).toEqual(`Bearer ${TOKEN_TESTING}`);
  });

  it('Should not add Authorization header when current user in firebase is null', () => {
    (authService.getAuthToken as jasmine.Spy).and.returnValue(of(null));

    const requestUrl = '/api/tasks';
    httpClientMock.get(requestUrl).subscribe();

    const req = httpMock.expectOne(requestUrl);
    const { headers } = req.request;

    expect(headers.has('Authorization')).toBeFalsy();
  });
});

