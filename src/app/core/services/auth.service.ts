import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithCustomToken,
  signInWithEmailAndPassword,
  signOut,
  User,
} from '@angular/fire/auth';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { UserRegisteredResultModel } from '../models/users/user-registered.model';
import { UserAuthType } from '../models/users/userAuth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_URL = `${environment.apiUrl}/users`;

  constructor(
    private readonly firebaseAuth: Auth,
    private readonly httpClient: HttpClient,
  ) {}

  public login(auth: UserAuthType): Observable<User | null> {
    return from(
      signInWithEmailAndPassword(this.firebaseAuth, auth.email, auth.password),
    ).pipe(map(({ user }): User => user));
  }

  public register(auth: UserAuthType): Observable<User | null> {
    return this.httpClient
      .post<UserRegisteredResultModel>(this.API_URL, auth)
      .pipe(
        switchMap((response) => {
          const { token } = response.body;
          return signInWithCustomToken(this.firebaseAuth, token);
        }),
      )
      .pipe(map(({ user }): User => user));
  }

  public logout(): Observable<void> {
    return from(signOut(this.firebaseAuth));
  }

  public getCurrentUser(): Observable<User | null> {
    return new Observable((observer) => {
      this.firebaseAuth.onAuthStateChanged(observer as any);
    });
  }

  public getAuthToken(): Observable<string | null> {
    if (this.firebaseAuth.currentUser) {
      return from(this.firebaseAuth.currentUser.getIdToken());
    }

    return from(Promise.resolve(null));
  }
}
