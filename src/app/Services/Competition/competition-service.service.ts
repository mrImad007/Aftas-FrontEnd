import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Competition } from '../../Interfaces/Competition';
import { Member } from 'src/app/Interfaces/Member';
import { Ranking } from 'src/app/Interfaces/Ranking';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {

  private endPoint: string = "http://localhost:8080/api/competitions";
  private rankingEndPoint: string = "http://localhost:8080/api/rankings"

  constructor(private httpClient: HttpClient) {}

  getAllCompetitions() {
    const headers = new HttpHeaders().set('Cache-Control', 'no-cache, no-store, must-revalidate');
    return this.httpClient.get(this.endPoint, { headers });
  }

  createCompetition(competition: Competition): Observable<Competition> {
    return this.httpClient.post<Competition>(this.endPoint, competition);
  }

  getCompetitionByCode(competitionCode: string): Observable<Competition> {
    const url = `${this.endPoint}/${competitionCode}`;
    return this.httpClient.get<Competition>(url);
  }

  getAllMembersInCompetition(competitionId: number): Observable<Member[]> {
    const url = `${this.endPoint}/${competitionId}/members`;
    return this.httpClient.get<Member[]>(url);
  }

  getOngoingCompetitions(): Observable<Competition[]> {
    const url = `${this.endPoint}/ongoing`;
    return this.httpClient.get<Competition[]>(url);
  }

  registerMemberInCompetition(requestBody: { member_num: number, competition_code: string }): Observable<Ranking> {
    return this.httpClient.post<Ranking>(this.rankingEndPoint, requestBody);
  }

  updatePointsForFishCaught(requestBody: { member_id: number, competition_id: string, fish_id: number }): Observable<string> {
    const url = `${this.endPoint}/update-points`;
    return this.httpClient.post<string>(url, requestBody);
  }

  deleteCompetition(competitionId: string): Observable<string> {
    const url = `${this.endPoint}/${competitionId}`;
    return this.httpClient.delete<string>(url);
  }
}
