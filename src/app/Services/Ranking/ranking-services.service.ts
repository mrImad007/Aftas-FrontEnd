import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ranking } from 'src/app/Models/Ranking';

@Injectable({
  providedIn: 'root'
})
export class RankingService {
  private endPoint = 'http://localhost:8080/api/rankings';

  constructor(private http: HttpClient) {}

  getTopMembers(id : string): Observable<Ranking[]> {
    const url = `${this.endPoint}/result/${id}`;
    return this.http.get<Ranking[]>(url);
  }

}
