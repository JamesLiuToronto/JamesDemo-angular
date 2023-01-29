import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forbiddenStringValidator, matchString } from 'src/app/shared/validators/password-validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {

  registerationForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registerationForm = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10), forbiddenStringValidator(/password/)]],
      confirm_password: [''],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      gender:[''],
      groupType: ['']}, 
      
      {validators: [matchString('password', 'confirm_password')]}) ;
  }

  get field(){
    return this.registerationForm!.controls;
  }
}
