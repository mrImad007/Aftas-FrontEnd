import { JwtHelperService } from '@auth0/angular-jwt';
import { Claim } from './../../Models/BearerToken.model';
import {Injectable} from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class JwtService {
  private jwtHelper: JwtHelperService;

  constructor() {
    this.jwtHelper = new JwtHelperService();
  }

  public decodeToken(token: string): any {
    return this.jwtHelper.decodeToken(token);
  }

  public getClaim(token: string, claimKey: string): any {
    const decodedToken = this.decodeToken(token);
    return decodedToken ? decodedToken[claimKey] : null;
  }

  public isTokenExpired(token: string): boolean {
    return this.jwtHelper.isTokenExpired(token);
  }

  hasRole(token: string, manager: string) {
    const decodedToken = this.decodeToken(token);
    const role = decodedToken["role"];
    return role.includes(manager);
  }

  public getClaimFromLocalStorage(): Claim | null {
    const token = localStorage.getItem("access_token");
    if (token) {
      this.decodeToken(token);
      let claim: Claim = {
        email: this.getClaim(token, "sub"),
        role: this.getClaim(token, "role"),
      }
      return claim;
    }
    return null;
  }

}