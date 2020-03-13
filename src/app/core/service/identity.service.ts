import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {map } from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';
import {AuthResult} from '../model/auth/auth-result';
import {UserLoginRequest} from '../Contracts/Requests/AuthRequest/user-login-request';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {
  private appUserSubject$: BehaviorSubject<AuthResult>;
  private appUser: Observable<AuthResult>;
  public request = new UserLoginRequest();
  token: string;

  constructor(private httpClient: HttpClient) {
    this.appUserSubject$ = new BehaviorSubject<AuthResult>(JSON.parse(localStorage.getItem('appUser')));
    this.appUser = this.appUserSubject$.asObservable();
  }

  public get appUserValue(): AuthResult {
    return this.appUserSubject$.value;
  }

  public login(email: string, password: string) {
    const apiRoute = `${environment.authentication}`;
    this.request.email = email;
    this.request.password = password;

    return this.httpClient.post<any>(
      apiRoute,
      this.request
    ).pipe(
      map( appUser => {
        if (appUser && appUser.token) {
          this.token = appUser.token;
          localStorage.setItem('appUser', JSON.stringify(appUser));
          this.appUserSubject$.next(appUser);
        }
        return appUser;
      }));
  }

  public logout() {
    localStorage.removeItem('appUser');
    this.appUserSubject$.next(null);
  }
}
