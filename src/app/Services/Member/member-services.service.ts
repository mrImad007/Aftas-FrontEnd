import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Member } from 'src/app/Models/Member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private endPoint = 'http://localhost:8080/api/members';

  constructor(private http: HttpClient) {}

  getAllMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.endPoint);
  }

  getMemberById(memberId: number): Observable<Member> {
    return this.http.get<Member>(`${this.endPoint}/${memberId}`);
  }

  getMembersByCompetiton(competitionCode: string): Observable<Member>{
    return this.http.get<Member>(`${this.endPoint}/code/${competitionCode}`);
  }

  createMember(member: Member): Observable<Member> {
    const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
    return this.http.post<Member>(this.endPoint, member, httpOptions);
  }

  deleteMember(num: string): Observable<any>{
    console.log("inside the endpoint" + num);
    return this.http.delete(`${this.endPoint}/${num}`,{responseType:'text'});
  }
}
