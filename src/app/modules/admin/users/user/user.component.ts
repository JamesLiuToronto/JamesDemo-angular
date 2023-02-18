import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Location } from '@angular/common';
import { User } from '../../model/User';
import { SimpleResultDTO } from 'src/app/shared/models/SimpleResultDTO';
import { ErrorDTO } from 'src/app/shared/models/ErrorDTO';
import { Router } from '@angular/router';
import { PopupWindowService } from 'src/app/shared/service/popup-window.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user: User | undefined;
  constructor(private usersService: UsersService, private location: Location, private router: Router, private popWindowService: PopupWindowService) { }
  token: string | undefined;
  toeknDisplay = false;

 
  ngOnInit(): void {
    this.user = this.usersService.getSelectedUser();
  }

  goBack() {
    // const lastNav = this.router.getLastSuccessfulNavigation();
    // const previousRoute = lastNav.previousNavigation; 
    // this.router.navigateByUrl(previousRoute);  
    this.location.back();
  }

  activateUser() {
    const title = "Activate User";
    this.usersService.activateUser()
      .subscribe(u => {
        this.user = u;
        alert(" activate user success = " + this.user.userStatus);
      }, (error) => this.errorHandler(title, error), () => {
        console.log("activate User finish=");
      });
  }
  deactivateUser() {

    const title = "Deactivate User";
    this.usersService.deactivateUser("By Admin")
      .subscribe(u => {
        this.user = u;
        alert(" deactivate user success = " + this.user.userStatus);
      }, (error) => this.errorHandler(title, error), () => {
        console.log("deactivate User finish=");
      });
  }

  sendActivateToken() {
    const title = "Send Activate Token ";
    this.usersService.getActivateToken()
      .subscribe(u => {
        let result: SimpleResultDTO = u;
        this.token = result.note;
        this.toeknDisplay = true;
        alert(" activete Token is copied to ClipBoard");
        console.log("activete Token  =" + result.note);
      }, (error) => this.errorHandler(title, error), () => {
        console.log("deactivate User finish=");
      });
  }

  errorHandler(title: string, error: ErrorDTO) {

    this.popWindowService.openPopWindow("ERROR", title + " - Error - (" + error.status + ")", error.error) ;


    // if (error.status == 401) {
    //   this.router.navigateByUrl('/auth/sing-in');
    // }

    // console.log(error.error + " " + error.message);
  }

  infoHandler(title: string, message:string) {

    this.popWindowService.openPopWindow("INFO", "INFO -- " + title , message) ;
  }

  displayInfo(){
    this.infoHandler("This is info", "asdfsafdsafdsaf asdfsdaf asdfdsafds sadfds") ;
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

  openPopUP() {
    return this.popWindowService.showOpen ;
  }


}
