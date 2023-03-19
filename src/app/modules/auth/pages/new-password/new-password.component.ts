import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PopupWindowService } from 'src/app/shared/service/popup-window.service';
import { forbiddenStringValidator, matchString } from 'src/app/shared/validators/password-validator';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss'],
})
export class NewPasswordComponent implements OnInit {
  constructor(private fb: FormBuilder, private router: Router, private routes: ActivatedRoute, 
    private authService: AuthService, private popWindowService: PopupWindowService) { }

  token = "NA";

  form!: FormGroup;
  private showPassword = false;

  ngOnInit(): void {
    const para = this.routes.snapshot.queryParamMap.get('token');
    if (para) {
      this.token = para;
    } else {
      this.popWindowService.openPopWindow("ERROR", "Request parameter missing", "this request URL is not valid, please check with Admin");

    }

    this.form = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10), forbiddenStringValidator(/password/)]],
      confirm_password: ['']
    }, { validators: [matchString('password', 'confirm_password')] });
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  isShowPassword() {
    return this.showPassword;
  }

  onSubmit(form: FormGroup) {
    this.authService.changePassword(form.get('password')?.value, this.token)
      .subscribe(u => {
        this.popWindowService.openPopWindow("INFO", "Update Password sucessfully" , "") ;
        this.router.navigate(['/mydashboard/my-dash']);


      }, (error) => {
        this.popWindowService.openPopWindow("ERROR", " Change Password failed with Error (" + error.status + ")", error.error) ;
      });

  }
  get field() {
    return this.form!.controls;
  }
}
