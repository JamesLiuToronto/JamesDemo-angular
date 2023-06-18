import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PopupWindowService } from 'src/app/shared/service/popup-window.service';
import { forbiddenStringValidator, matchString } from 'src/app/shared/validators/password-validator';
import { AccountRegistrationDTO } from '../../model/Auth';
import { SignupService } from '../../services/signup.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {

  registerationForm!: FormGroup;
  private showPassword = false;
  private readySubmit: boolean = false;

  constructor(private fb: FormBuilder, private signupService: SignupService, private router: Router, private popWindowService: PopupWindowService) { }

  ngOnInit(): void {
    this.registerationForm = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10), forbiddenStringValidator(/password/)]],
      confirm_password: [''],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      gender: ['NA'],
      groupType: ['STUDENT'],
      acceptTerm: [false]
    },

      { validators: [matchString('password', 'confirm_password')] });

    this.registerationForm.get('acceptTerm')?.valueChanges.
      subscribe(checkedValue => {
        if (checkedValue) {
          this.readySubmit = true;
        }
        else {
          this.readySubmit = false;
        }
      })

  }

  onSubmit(form: FormGroup) {
    this.signupService.signUp(this.map(form))
      .subscribe(u => {
        this.success();

      
      
    }, (error) => {
      this.submitErrorHandler(error)
    });
  
}

map(form: FormGroup) {

  const typeList = [];
  typeList.push(form.get('groupType')?.value);
  const inputUser: AccountRegistrationDTO = {

    emailAddress: form.get('email')?.value,
    password: form.get('password')?.value,
    firstName: form.get('firstName')?.value,
    lastName: form.get('lastName')?.value,
    gender: form.get('gender')?.value,
    loginSourceType: "NULL",
    groupTypeList: typeList,
  };

  return inputUser;

}

  get field(){
  return this.registerationForm!.controls;
}

toggleShowPassword(){
  this.showPassword = !this.showPassword;
}

isShowPassword(){
  return this.showPassword;
}

isReadySubmit(){
  return this.readySubmit;
}

private submitErrorHandler(error: any) {
  this.popWindowService.openPopWindow("ERROR", " Sign Up failed with Error (" + error.status + ")", error.error) ;
}

success() {

  this.popWindowService.openPopWindow("INFO", "User SignUp Successfully ", "Please check email to activate this singup user") ;
  this.router.navigate(['/mydashboard/my-dash']);
 
}


}
