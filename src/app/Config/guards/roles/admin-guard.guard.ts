import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree , Router} from '@angular/router';
import { Observable } from 'rxjs';
import { JwtService } from 'src/app/Services/Jwt/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardGuard implements CanActivate {
  constructor(private jwtSevice: JwtService, private router:Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const token = localStorage.getItem("access_token");

       if (token !== null) {
        if(this.jwtSevice.hasRole(token, "ADMIN")){
          return true;
        }
      }
      alert('You do not have admin privileges');
      return this.router.navigate(['/form']);
  }
  
}
