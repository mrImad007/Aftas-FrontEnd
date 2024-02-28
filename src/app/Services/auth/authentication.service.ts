import { Injectable } from '@angular/core';
import { ApiService } from '../Api/api.service';
import { BehaviorSubject, tap } from 'rxjs';
import { User } from 'src/app/Models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  private readonly TOKEN_NAME = 'token';
  isLoggedIn$ = this._isLoggedIn$.asObservable();
  user: User | null;

  get token(): any {
    return localStorage.getItem(this.TOKEN_NAME);
  }

  constructor(private apiService: ApiService) {
    this._isLoggedIn$.next(!!this.token);
    this.user = this.getUser(this.token);
  }
  
  login(username: string, password: string) {
    return this.apiService.login(username, password).pipe(
      tap((response: any) => {
        this._isLoggedIn$.next(true);
        localStorage.setItem(this.TOKEN_NAME, response.token);
        this.user = this.getUser(response.token);
      })
    );
  }

  private getUser(token: string): User | null {
    if (!token) {
      return null
    }
    return JSON.parse(atob(token.split('.')[1])) as User;
  }

}
