import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AccountDTO, LoginForm, LoginResult} from '../model/Auth';
import { Observable } from 'rxjs';
import { EnvService } from 'src/app/shared/service/env.service';
import { HttpUtilityService } from 'src/app/shared/service/http-utility.service';
import { SimpleResultDTO } from 'src/app/shared/models/SimpleResultDTO';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginErrorMessage: string = "Login failed, email password not match";
  errorMsg: string | undefined;
  result: boolean = false ;
  
  constructor(private http: HttpClient, private environment: EnvService, private httpUtility :HttpUtilityService) {
  
  }

  login(form: LoginForm) : Observable<LoginResult>{
    let url: string = this.environment.serverurl + "/account/login" ;
   
    let params = new HttpParams().
        append('username', form.email).
        append('password', form.password);
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set("Content-Type", "application/x-www-form-urlencoded");
    return this.http.post<LoginResult>(url,{ headers: headers }, { params: params });
  }

  getLoginUser() : Observable<LoginResult>{
    return this.http.get<LoginResult>(this.environment.serverurl  + "/api/login/login-user-info",{ headers: this.httpUtility.getHeader()});
  }

  changePassword(password:string, token:string) : Observable<SimpleResultDTO>{
    let url =  this.environment.serverurl + "/account/registration/change-password-token?password=" + password + "&token=" + token ;
    return this.http.post<SimpleResultDTO>(url, null);
  }
 

  enableAuthenticated(loginAccount: LoginResult) {
    localStorage.setItem('userId', loginAccount!.userId.toString());
    localStorage.setItem('token', loginAccount!.token);
    localStorage.setItem('account', JSON.stringify(loginAccount!.account));
    localStorage.setItem('roles', loginAccount!.account.roleList);
    console.log("token=" + localStorage.getItem('token'));
    localStorage.setItem('isAuthenticated', 'true');
  }

  disableAuthenticated() {
    localStorage.setItem('isAuthenticated', 'false');
    localStorage.setItem('userId', "");
  }

  isAuthenticated(){
    return localStorage.getItem('isAuthenticated')== "true";
  }
  

  logoutService() {
    this.disableAuthenticated();
    localStorage.removeItem('userId');

  }

  getGoogleUrl(){
    return this.environment.googleurl ;
    
  }

  getLoginedInUserAccount() :AccountDTO {
    return JSON.parse(localStorage.getItem('account')!) ;
  }


}
