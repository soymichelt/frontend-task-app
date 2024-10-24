import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  signOut,
  User,
} from '@angular/fire/auth';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserAuthType } from '../models/users/userAuth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly firebaseAuth: Auth) {}

  public login(auth: UserAuthType): Observable<User | null> {
    return from(
      signInWithEmailAndPassword(this.firebaseAuth, auth.email, auth.password),
    ).pipe(map(({ user }): User => user));
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
