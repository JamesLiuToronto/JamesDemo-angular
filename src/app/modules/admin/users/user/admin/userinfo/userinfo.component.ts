import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/modules/admin/model/User';
import { UserService } from 'src/app/modules/admin/services/user.service';
import { UsersService } from 'src/app/modules/admin/services/users.service';
import { HttpUtilityService } from 'src/app/shared/service/http-utility.service';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.scss']
})
export class UserinfoComponent implements OnInit {

  constructor(private fb: FormBuilder, private usersService: UsersService, private userService: UserService,
    private httpUtilityService: HttpUtilityService) { }

  user: User | undefined;
  personalInfoForm!: FormGroup;

  ngOnInit(): void {
    this.user = this.usersService.getSelectedUser();
    this.personalInfoForm = this.fb.group({
      firstName: [this.user?.firstName, [Validators.required]],
      lastName: [this.user?.lastName, [Validators.required]]
    });

  }

  personalInfoChangeSubmit(form: FormGroup) {
    this.userService.updatePersonInfo(this.user!, form.get('firstName')?.value, form.get('lastName')?.value)
        .subscribe(u => {
          this.httpUtilityService.openPopWindow("INFO", " PersonInfo Update Success" , " ") ;
  
        
        
      }, (error) => {
        this.httpUtilityService.errorHandler(" PersonInfo Update Failed" , error) ;
      });  
  
    }

    undoPersonInfo(){
      this.personalInfoForm.setValue({
        firstName: this.user?.firstName,
        lastName: this.user?.lastName
      });
    }

    isLocalUserAccount(){
      return this.user?.provider =="NULL" ;
    }
}
