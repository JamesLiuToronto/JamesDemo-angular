import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorDTO } from 'src/app/shared/models/ErrorDTO';
import { PopupWindowService } from 'src/app/shared/service/popup-window.service';
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
  private showPassword = false;

  title:string = " Login " ;

  form: LoginForm = {
    email: '',
    password: '',
  };

  constructor(private authService: AuthService, private router: Router, private routes: ActivatedRoute, private popWindowService: PopupWindowService) {
  }
  ngOnInit(): void {
    const token = this.routes.snapshot.queryParamMap.get('token');
	  const error = this.routes.snapshot.queryParamMap.get('error');
    if (token){
      localStorage.setItem('token', token);
      this.getLoginUserInfoWithToken() ;
    } else if(error){
      this.errorHandlerMessage(this.title,error) ;
      this.logout() ;
  	}
  }

  getLoginUserInfoWithToken(){
    this.authService.getLoginUser().
    subscribe(u => {
      this.loginAccount = u;
      this.setLogin() ;
      
    }, (error: ErrorDTO) => {
      this.errorHandler(this.title,error) ;
      console.log("error happened2=" + JSON.stringify(error)) ;
    });
  }

  loginWithGoogle(){
    //window.location.href = "http://localhost:9091/oauth2/authorization/google?redirect_uri=http://localhost:4200/auth/sign-in" ;
    window.location.href = this.authService.getGoogleUrl() ;
    console.log("window.location.href=" + window.location.href) ;
  }

  submit(){

    this.isLoading = true;
    this.errorMessage = undefined;
    this.isLoading = true;

    this.authService.login(this.form).
    subscribe(u => {
      this.loginAccount = u;
      
      if (this.loginAccount != undefined){
        this.setLogin() ;
       
      } else {
        console.log("wrong path=" + encodeURI(JSON.stringify(this.loginAccount))) ;
        //this.loginErrorHandler("Wrong result=" + encodeURI(JSON.stringify(this.loginAccount))) ;
      }
      
    }, (error: ErrorDTO) => {
      this.errorHandler(this.title,error) ;
      console.log("error happened2=" + JSON.stringify(error)) ;
    });
  }

  setLogin(){
    this.authService.enableAuthenticated(this.loginAccount!);
    this.goHome();
  }

  
  logout() {
    this.authService.logoutService();
    this.router.navigateByUrl('/auth/sing-in');
  }

  goHome() {
    this.router.navigate(['/mydashboard/my-dash']);
   
  }

  toggleShowPassword(){
    this.showPassword = !this.showPassword;
  }
  
  isShowPassword(){
    return this.showPassword;
  }

  errorHandler(title: string, error: ErrorDTO) {

    this.popWindowService.openPopWindow("ERROR", title + " - Error - (" + error.status + ")", error.error) ;

  }

  errorHandlerMessage(title: string, error: string) {

    this.popWindowService.openPopWindow("ERROR", title + " - Error - (401)", error) ;

  }

  infoHandler(title: string, message:string) {

    this.popWindowService.openPopWindow("INFO", "INFO -- " + title , message) ;
  }


}