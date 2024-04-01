import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/Models/User';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private endPoint = 'http://localhost:8080/api/auth/users';

  constructor(private http: HttpClient) {}

  getNewAccounts(): Observable<User[]> {
    return this.http.get<User[]>(this.endPoint);
  }

  ChangeAccountStatus(email: string, status: string) : Observable<string>{
    const endPoint = 'http://localhost:8080/api/admin/account-confirmation';
    const url = `${endPoint}?email=${email}&status=${status}`;
    return this.http.post<string>(url,null);
  }

}
