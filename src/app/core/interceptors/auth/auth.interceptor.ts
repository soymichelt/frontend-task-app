import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, switchMap } from 'rxjs';

import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return from(this.authService.getAuthToken()).pipe(
      switchMap((firebaseAuthToken: string | null) => {
        if (!firebaseAuthToken) {
          return next.handle(req);
        }

        const newReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${firebaseAuthToken}`,
          },
        });

        return next.handle(newReq);
      }),
    );
  }
}
