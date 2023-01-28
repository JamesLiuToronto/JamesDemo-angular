import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginForm, LoginResult } from '../../model/Auth';
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
        localStorage.setItem('account', encodeURI(JSON.stringify(this.loginAccount.account)));
        console.log("userid=" + localStorage.getItem('userId'));
        this.authService.enableAuthenticated();
        console.log("before return true") ;
        this.goHome();
       
      } else {
        console.log("wrong path=" + encodeURI(JSON.stringify(this.loginAccount))) ;
        
      }
      
    }, (error) => {
      this.loginErrorHandler(error)
      console.log("error happened=" + error) ;
    });
  }

  private loginErrorHandler(error: any) {
    alert("login failed" + error.message);
    console.log("catch error =" + error.errorMessage);
  }


  logout() {
    this.authService.logoutService();
    console.log("call logout service=" + this.authService.isAuthenticated)
    this.router.navigateByUrl('/auth/sing-in');
  }

  goHome() {
    this.router.navigate(['/dashboard/nfts']);
   
  }

}