import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/modules/admin/model/User';
import { UserService } from 'src/app/modules/admin/services/user.service';
import { UsersService } from 'src/app/modules/admin/services/users.service';
import { HttpUtilityService } from 'src/app/shared/service/http-utility.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['../../user-style.scss']
})
export class EmailComponent implements OnInit {

  constructor(private fb: FormBuilder, private usersService: UsersService, private userService: UserService, 
    private httpUtilityService: HttpUtilityService) { }

  user: User | undefined;
  emailForm!: FormGroup;

  ngOnInit(): void {
    this.user = this.usersService.getSelectedUser();
    this.emailForm = this.fb.group({
      email: [this.user?.emailAddress, [Validators.required, Validators.minLength(5)]]
    });

  }

  emailChangeSubmit(form: FormGroup) {
    this.userService.updateEmail(this.user!, form.get('email')?.value)
      .subscribe({
        next: u => {
          this.httpUtilityService.openPopWindow("INFO", " Email Update Success", " ");
          this.user!.emailAddress = form.get('email')?.value ;
        }, 
        error: (error) => {
          this.httpUtilityService.errorHandler(" Email Update Failed ", error);
        }
    });
  }

  undoEmailAddress() {
    this.emailForm.setValue({
      email: this.user?.emailAddress
    });
  }

  isLocalUserAccount(){
    return this.user?.provider =="NULL" ;
  }

}
