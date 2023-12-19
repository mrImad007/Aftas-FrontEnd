import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hunting } from 'src/app/Interfaces/Hunting';

@Injectable({
  providedIn: 'root'
})
export class HuntingService {

  constructor(private http: HttpClient) { }

  private endPoint: string  = "http://localhost:8080/api/huntings" 

  addHunting(requestBody: {member_id:number, competition_id: string, fish_id: string, numberOfFish: number }): Observable<Hunting>{
    return this.http.post<Hunting>(this.endPoint,requestBody);
  }
}
