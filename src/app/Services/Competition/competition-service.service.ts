import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Competition } from '../../Interfaces/Competition';


@Injectable({
  providedIn: 'root'
})
export class CompetitionService {

  private endPoint: string = "https://localhost:8080/api/competitions";

  constructor(private httpClient: HttpClient) {}

  getAllCompetitions(): Observable<Competition[]>{
    console.log(this.httpClient.get<Competition[]>(this.endPoint));
    return this.httpClient.get<Competition[]>(this.endPoint);
  }

}
