import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { NewPasswordComponent } from './pages/new-password/new-password.component';
import { TwoStepsComponent } from './pages/two-steps/two-steps.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PopupWindowComponent } from 'src/app/shared/components/popup-window/popup-window.component';


@NgModule({
    declarations: [
        AuthComponent,
        SignInComponent,
        SignUpComponent,
        ForgotPasswordComponent,
        NewPasswordComponent,
        TwoStepsComponent,
    ],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, AuthRoutingModule, AngularSvgIconModule.forRoot(), PopupWindowComponent]
})
export class AuthModule {}
