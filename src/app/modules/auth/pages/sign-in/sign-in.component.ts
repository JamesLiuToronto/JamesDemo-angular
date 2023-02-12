import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorDTO } from 'src/app/shared/models/ErrorDTO';
import { AccountDTO, LoginForm, LoginResult } from '../../model/Auth';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  isLoading: boolean = false;
  errorMessage: string | undefined;;
  loginAccount: LoginResult | undefined;
  serviceResult: string = "0" ;
  private showPassword = false;
  form: LoginForm = {
    email: '',
    password: '',
  };

  constructor(private authService: AuthService, private router: Router, private routes: ActivatedRoute) {
  }
  ngOnInit(): void {

  }

  submit(){

    this.isLoading = true;
    this.errorMessage = undefined;
    this.isLoading = true;

    this.authService.login(this.form).
    subscribe(u => {
      this.loginAccount = u;
      
      if (this.loginAccount != undefined){
        localStorage.setItem('userId', this.loginAccount.userId.toString());
        localStorage.setItem('token', this.loginAccount.token);
        localStorage.setItem('account', JSON.stringify(this.loginAccount.account));
        localStorage.setItem('roles', this.loginAccount.account.roleList);
        console.log("token=" + localStorage.getItem('token'));
        this.authService.enableAuthenticated();
        this.goHome();
       
      } else {
        console.log("wrong path=" + encodeURI(JSON.stringify(this.loginAccount))) ;
        //this.loginErrorHandler("Wrong result=" + encodeURI(JSON.stringify(this.loginAccount))) ;
      }
      
    }, (error: ErrorDTO) => {
      this.loginErrorHandler(error)
      console.log("error happened2=" + JSON.stringify(error)) ;
    });
  }

  private loginErrorHandler(error: ErrorDTO) {

    alert("login failed" + error.error);
    console.log("catch error =" + error.status);
  }


  logout() {
    this.authService.logoutService();
    console.log("call logout service=" + this.authService.isAuthenticated)
    this.router.navigateByUrl('/auth/sing-in');
  }

  goHome() {
    this.router.navigate(['/dashboard/nfts']);
   
  }

  toggleShowPassword(){
    this.showPassword = !this.showPassword;
  }
  
  isShowPassword(){
    return this.showPassword;
  }

}