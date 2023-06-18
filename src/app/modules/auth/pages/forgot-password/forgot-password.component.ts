import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/modules/admin/services/user.service';
import { SimpleResultDTO } from 'src/app/shared/models/SimpleResultDTO';
import { HttpUtilityService } from 'src/app/shared/service/http-utility.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  constructor(private fb: FormBuilder, private httpUtilityService: HttpUtilityService, private userService: UserService) { }

  emailForm!: FormGroup;

  ngOnInit(): void {
    this.emailForm = this.fb.group({
      email: ["", [Validators.required, Validators.minLength(5)]]
    });

  }

  sendResetPasswordToken(form: FormGroup) {
    const title = "Send reset Password Token ";
    this.userService.getResetPasswordToken(form.get('email')?.value)
      .subscribe(u => {
        let result: SimpleResultDTO = u;
        let token = result.note;
        this.httpUtilityService.openPopWindow("INFO", "Reset Password Token is generated Successful", "token: " + token);
      }, (error) => this.httpUtilityService.errorHandler(title, error), () => {
      });
  }

  get field() {
    return this.emailForm!.controls;
  }
}
