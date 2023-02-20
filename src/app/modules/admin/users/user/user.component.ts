import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Location } from '@angular/common';
import { User } from '../../model/User';
import { SimpleResultDTO } from 'src/app/shared/models/SimpleResultDTO';
import { ErrorDTO } from 'src/app/shared/models/ErrorDTO';
import { PopupWindowService } from 'src/app/shared/service/popup-window.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],

})
export class UserComponent implements OnInit {

  constructor(private fb: FormBuilder, private usersService: UsersService, private location: Location, 
              private popWindowService: PopupWindowService) { }
  
  goBack() {
    // const lastNav = this.router.getLastSuccessfulNavigation();
    // const previousRoute = lastNav.previousNavigation; 
    // this.router.navigateByUrl(previousRoute);  
    this.location.back();
  }
 
  user: User | undefined;
  

  emailForm!: FormGroup;
  personalInfoForm!: FormGroup;
  token: string | undefined;
  toeknDisplay = false;

  ngOnInit(): void {
    this.user = this.usersService.getSelectedUser() ;
    this.emailForm = this.fb.group({
      email: [this.user?.emailAddress, [Validators.required, Validators.minLength(5)]]
      }) ;

      this.personalInfoForm = this.fb.group({
        firstName: [this.user?.firstName, [Validators.required]],
        lastName: [this.user?.lastName, [Validators.required]]
      });
  }

  emailChangeSubmit(form: FormGroup) {
    // this.signupService.signUp(this.map(form))
    //   .subscribe(u => {
    //     console.log("signup successful");
    //     this.success();

      
      
    // }, (error) => {
    //   this.submitErrorHandler(error)
    //   console.log("error happened=" + error);
    // });
  }
    personalInfoChangeSubmit(form: FormGroup) {
      // this.signupService.signUp(this.map(form))
      //   .subscribe(u => {
      //     console.log("signup successful");
      //     this.success();
  
        
        
      // }, (error) => {
      //   this.submitErrorHandler(error)
      //   console.log("error happened=" + error);
      // });  
  
    }

    activateUser() {
      const title = "Activate User";
      this.usersService.activateUser()
        .subscribe(u => {
          this.user = u;
          this.infoHandler("Activate User Successful", "User status is " + this.user.userStatus ) ;
        }, (error) => this.errorHandler(title, error), () => {
          console.log("activate User finish=");
        });
    }
    deactivateUser() {
  
      const title = "Deactivate User";
      this.usersService.deactivateUser("By Admin")
        .subscribe(u => {
          this.user = u;
          this.infoHandler("Deactivate User Successful", "User status is " + this.user.userStatus ) ;
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
          this.infoHandler("Activate Token is generated Successful", "token: " + this.token ) ;
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
