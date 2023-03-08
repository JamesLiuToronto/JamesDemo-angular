import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { User } from 'src/app/modules/admin/model/User';
import { UserService } from 'src/app/modules/admin/services/user.service';
import { UsersService } from 'src/app/modules/admin/services/users.service';
import { SimpleResultDTO } from 'src/app/shared/models/SimpleResultDTO';
import { HttpUtilityService } from 'src/app/shared/service/http-utility.service';

@Component({
  selector: 'app-userstatus',
  templateUrl: './userstatus.component.html',
  styleUrls: ['./userstatus.component.scss']
})
export class UserstatusComponent implements OnInit {

  constructor(private fb: FormBuilder, private usersService: UsersService, private userService: UserService, 
    private httpUtilityService: HttpUtilityService) { }

  user: User | undefined;
  toeknDisplay = false;
  token: string | undefined;

  ngOnInit(): void {
    this.user = this.usersService.getSelectedUser() ;
  }

  activateUser() {
    const title = "Activate User";
    this.userService.activateUser(this.user!)
      .subscribe(u => {
        this.user = u;
        this.httpUtilityService.openPopWindow("INFO","Activate User Successful", "User status is " + this.user.userStatus ) ;
      }, (error) => this.httpUtilityService.errorHandler(title, error), () => {
        console.log("activate User finish=");
      });
  }
  deactivateUser() {

    const title = "Deactivate User";
    this.userService.deactivateUser(this.user!, "By Admin")
      .subscribe(u => {
        this.user = u;
        this.httpUtilityService.openPopWindow( "INFO", "Deactivate User Successful", "User status is " + this.user.userStatus ) ;
      }, (error) => this.httpUtilityService.errorHandler(title, error), () => {
        console.log("deactivate User finish=");
      });
  }

  sendActivateToken() {
    const title = "Send Activate Token ";
    this.userService.getActivateToken(this.user!)
      .subscribe(u => {
        let result: SimpleResultDTO = u;
        this.token = result.note;
        this.toeknDisplay = true;
        this.httpUtilityService.openPopWindow("INFO", "Activate Token is generated Successful", "token: " + this.token ) ;
      }, (error) => this.httpUtilityService.errorHandler(title, error), () => {
        console.log("deactivate User finish=");
      });
  }

  

  isLocalUserAccount(){
    return this.user?.provider =="NULL" ;
  }

  isPending() {
    return this.user?.userStatus.includes("PENDING");
  }

  isActive() {
    return this.user?.userStatus.includes("ACTIVE");
  }

  isDisable() {
    return this.user?.userStatus.includes("DISABLE");
  }

  displayToken() {
    return this.toeknDisplay;
  }


}
