import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ranking } from 'src/app/Interfaces/Ranking';

@Injectable({
  providedIn: 'root'
})
export class RankingService {
  private endPoint = 'http://localhost:8080/api/rankings';

  constructor(private http: HttpClient) {}

  getTopMembers(id : number): Observable<Ranking[]> {
    const url = `${this.endPoint}/highest-score/${id}`;
    return this.http.get<Ranking[]>(url);
  }

}
