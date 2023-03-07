import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Location } from '@angular/common';
import { User } from '../../model/User';
import { SimpleResultDTO } from 'src/app/shared/models/SimpleResultDTO';
import { ErrorDTO } from 'src/app/shared/models/ErrorDTO';
import { PopupWindowService } from 'src/app/shared/service/popup-window.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],

})
export class UserComponent implements OnInit {

  constructor(private fb: FormBuilder, private usersService: UsersService, private userService: UserService, private location: Location, 
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
     this.userService.updateEmail(this.user!, form.get('email')?.value)
       .subscribe(u => {
        this.popWindowService.openPopWindow("INFO", " Email Update Success" , " ") ;
     }, (error) => {
      this.errorHandler(" Email Update Failed" , error) ;
     });
  }

  undoEmailAddress(){
    this.emailForm.setValue({
      email: this.user?.emailAddress 
    });
  }

  personalInfoChangeSubmit(form: FormGroup) {
    this.userService.updatePersonInfo(this.user!, form.get('firstName')?.value, form.get('lastName')?.value)
        .subscribe(u => {
          this.popWindowService.openPopWindow("INFO", " PersonInfo Update Success" , " ") ;
  
        
        
      }, (error) => {
        this.errorHandler(" PersonInfo Update Failed" , error) ;
      });  
  
    }

    undoPersonInfo(){
      this.personalInfoForm.setValue({
        firstName: this.user?.firstName,
        lastName: this.user?.lastName
      });
    }

    activateUser() {
      const title = "Activate User";
      this.userService.activateUser(this.user!)
        .subscribe(u => {
          this.user = u;
          this.infoHandler("Activate User Successful", "User status is " + this.user.userStatus ) ;
        }, (error) => this.errorHandler(title, error), () => {
          console.log("activate User finish=");
        });
    }
    deactivateUser() {
  
      const title = "Deactivate User";
      this.userService.deactivateUser(this.user!, "By Admin")
        .subscribe(u => {
          this.user = u;
          this.infoHandler("Deactivate User Successful", "User status is " + this.user.userStatus ) ;
        }, (error) => this.errorHandler(title, error), () => {
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

    isLocalUserAccount(){
      return this.user?.provider =="NULL" ;
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
