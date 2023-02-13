import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Location } from '@angular/common';
import { User } from '../../model/User';
import { HttpUtilityService } from 'src/app/shared/service/http-utility.service';
import { SimpleResultDTO } from 'src/app/shared/models/SimpleResultDTO';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements  OnInit {

  user : User |undefined ;
  constructor(private usersService : UsersService, private location: Location, private httpUtility: HttpUtilityService){}
  

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
    }, (error) => this.httpUtility.loginErrorHandler(title, error), ()=>{
     console.log("activate User finish=" ) ;  
    });
  }
  deactivateUser(){
    const title = "Deactivate User" ;
    this.usersService.deactivateUser()
    .subscribe(u => {
      this.user = u ;
      alert(" deactivate user success = " + this.user.userStatus);
    }, (error) => this.httpUtility.loginErrorHandler(title, error), ()=>{
     console.log("deactivate User finish=" ) ;  
    });
  }

  sendActivateToken(){
    const title = "send Activate Token " ;
    this.usersService.getActivateToken()
    .subscribe(u => {
      let result:SimpleResultDTO = u ;
      alert(" activete Token is = " + result.note );
      console.log("activete Token  =" + result.note) ;  
    }, (error) => this.httpUtility.loginErrorHandler(title, error), ()=>{
     console.log("deactivate User finish=" ) ;  
    });
  }

  isPending(){
    return this.user?.userStatus.includes("PENDING") ;
  }

  isActive(){
    return this.user?.userStatus.includes("ACTIVE") ;
  }

  isDisable(){
    return this.user?.userStatus.includes("DISABLE") ;
  }



}
