import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { User } from 'src/app/modules/admin/model/User';
import { UserService } from 'src/app/modules/admin/services/user.service';
import { UsersService } from 'src/app/modules/admin/services/users.service';
import { SimpleResultDTO } from 'src/app/shared/models/SimpleResultDTO';
import { HttpUtilityService } from 'src/app/shared/service/http-utility.service';

@Component({
  selector: 'app-usertoken',
  templateUrl: './usertoken.component.html',
  styleUrls: ['../../user-style.scss']
})
export class UsertokenComponent implements OnInit {

  constructor(private fb: FormBuilder, private usersService: UsersService, private userService: UserService, 
    private httpUtilityService: HttpUtilityService) { }

  user: User | undefined;
  toeknDisplay = false;
  token: string | undefined;

  ngOnInit(): void {
    this.user = this.usersService.getSelectedUser() ;
  }

  

  sendResetPasswordToken() {
    const title = "Send reset Password Token ";
    this.userService.getResetPasswordToken(this.user!.emailAddress)
      .subscribe(u => {
        let result: SimpleResultDTO = u;
        this.token = result.note;
        this.toeknDisplay = true;
        this.httpUtilityService.openPopWindow("INFO", "Reset Password Token is generated Successful", "token: " + this.token ) ;
      }, (error) => this.httpUtilityService.errorHandler(title, error), () => {
        console.log("Reset Password Token finish=");
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
