import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtService } from 'src/app/Services/Jwt/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AdherantGuardGuard implements CanActivate {
  constructor(private jwtSevice: JwtService, private router:Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      const token = localStorage.getItem("access_token");

       if (token !== null) {
        if(this.jwtSevice.hasRole(token, "ADHERANT")){
          return true;
        }
      }
      alert('You do not have adherant privileges');
      return this.router.navigate(['/form']);
  }
  
}
