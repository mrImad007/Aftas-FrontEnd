import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/Services/Users/users.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit{

  users: any;
  ngOnInit(): void {
    this.getInactiveAccounts();
  }

  constructor(private  usersService : UsersService,private router:Router) {}

  getInactiveAccounts(){
    this.usersService.getNewAccounts().subscribe(
      (users : any) => {
        this.users = users;
        console.log(this.users)
      },
      (error) => {
        console.error(error);
      }
    )
  }
  refuseAccount(email : string) {
    this.usersService.ChangeAccountStatus(email, "REFUSED").subscribe(() => {
      console.log("ref clicked");
      window.location.reload();
    });
  }
  acceptAccount(email : string) {
    this.usersService.ChangeAccountStatus(email, "ACCEPTED").subscribe(() => {
      console.log("acccc clicked");
      window.location.reload();
    });
  }
}
