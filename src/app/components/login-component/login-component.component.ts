import { ApiService } from './../../Services/Api/api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/Services/Jwt/jwt.service';



@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit{
  loginForm: FormGroup; 
  

  constructor(private fb: FormBuilder, private ApiService:ApiService, private  jwtService : JwtService, private router: Router) { 
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    console.log("in the imad");
    
  }


  onSubmit() {
    if (this.loginForm.valid) {
      this.ApiService.login(this.loginForm.value.email,this.loginForm.value.password).subscribe(
        (response : any)=>{
          localStorage.setItem("access_token",response.access_token);
          localStorage.setItem("fresh_token",response.refresh_token as string);
        }
      );
      this.router.navigate(['/Members']);
    }
  }
}
