import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Member } from 'src/app/Interfaces/Member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private apiUrl = 'http://localhost:8080/api/members';

  constructor(private http: HttpClient) {}

  getAllMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.apiUrl);
  }

  getMemberById(memberId: number): Observable<Member> {
    return this.http.get<Member>(`${this.apiUrl}/${memberId}`);
  }

  getMembersByCompetiton(competitionCode: string): Observable<Member>{
    return this.http.get<Member>(`${this.apiUrl}/code/${competitionCode}`);
  }

  createMember(member: Member): Observable<Member> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post<Member>(this.apiUrl, member, httpOptions);
  }
}
