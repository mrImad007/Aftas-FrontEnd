import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { BearerToken } from 'src/app/Models/BearerToken.model';


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<BearerToken> {
    const url = "http://localhost:8080/api/auth/login"
    console.log("Oussama : ",this.http.post<BearerToken>(url, { email, password }));
    
    return this.http.post<BearerToken>(url, { email, password });
  }
}