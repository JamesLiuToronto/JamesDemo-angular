import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Location } from '@angular/common';
import { User } from '../../model/User';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements  OnInit {

  user : User |undefined ;
  constructor(private usersService : UsersService, private location: Location,){}

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
    this.usersService.activateUser()
    .subscribe(u => {
      this.user = u ;
      alert(" activate user success = " + this.user.userStatus);
    }, (error) => this.userErrorHandler(error), ()=>{
     console.log("activate User finish=" ) ;  
    });
  }
  deactivateUser(){
    this.usersService.deactivateUser()
    .subscribe(u => {
      this.user = u ;
      alert(" deactivate user success = " + this.user.userStatus);
    }, (error) => this.userErrorHandler(error), ()=>{
     console.log("deactivate User finish=" ) ;  
    });
  }

  private userErrorHandler(error: any) {
    alert("user operation failed" + error.message);
    console.log("catch error =" + error.errorMessage);

  }

}
