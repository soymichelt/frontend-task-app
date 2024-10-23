import { TestBed } from '@angular/core/testing';
import { User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', [
      'getCurrentUser',
    ]);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should allow access when the user is authenticated', (done) => {
    authService.getCurrentUser.and.returnValue(
      of({ uid: '123', email: 'test@example.com' } as User),
    );

    guard.canActivate(null as any, null as any).subscribe((canActivate) => {
      expect(canActivate).toBe(true);
      expect(router.navigate).not.toHaveBeenCalled();
      done();
    });
  });

  it('should deny access and navigate to signin when the user is not authenticated', (done) => {
    // Simulamos que no hay usuario autenticado
    authService.getCurrentUser.and.returnValue(of(null));

    guard.canActivate(null as any, null as any).subscribe((canActivate) => {
      expect(canActivate).toBe(false);
      expect(router.navigate).toHaveBeenCalledWith(['/signin']);
      done();
    });
  });
});
