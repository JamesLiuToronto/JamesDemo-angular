import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Location } from '@angular/common';
import { User } from '../../model/User';
import { HttpErrorService } from 'src/app/shared/service/http-error.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements  OnInit {

  user : User |undefined ;
  constructor(private usersService : UsersService, private location: Location, private httpError: HttpErrorService){}
  

  ngOnInit(): void {
    this.user = this.usersService.getSelectedUser();
  }

  goBack(){
    // const lastNav = this.router.getLastSuccessfulNavigation();
    // const previousRoute = lastNav.previousNavigation; 
    // this.router.navigateByUrl(previousRoute);  
    this.location.back();
  }
  
  activateUser(){
    const title = "Activate User" ;
    this.usersService.activateUser()
    .subscribe(u => {
      this.user = u ;
      alert(" activate user success = " + this.user.userStatus);
    }, (error) => this.httpError.loginErrorHandler(title, error), ()=>{
     console.log("activate User finish=" ) ;  
    });
  }
  deactivateUser(){
    const title = "Deactivate User" ;
    this.usersService.deactivateUser()
    .subscribe(u => {
      this.user = u ;
      alert(" deactivate user success = " + this.user.userStatus);
    }, (error) => this.httpError.loginErrorHandler(title, error), ()=>{
     console.log("deactivate User finish=" ) ;  
    });
  }

  isAdminUers(){
    console.log("save role=" + localStorage.getItem('roles')?.includes("ADMIN") );
    return localStorage.getItem('roles')?.includes("ADMIN") ;
  }

}
