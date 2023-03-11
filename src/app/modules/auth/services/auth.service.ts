import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AccountDTO, LoginForm, LoginResult} from '../model/Auth';
import { Observable } from 'rxjs';
import { EnvService } from 'src/app/shared/service/env.service';
import { HttpUtilityService } from 'src/app/shared/service/http-utility.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginErrorMessage: string = "Login failed, email password not match";
  errorMsg: string | undefined;
  result: boolean = false ;
  baseUrl: string ="url" ;

  constructor(private http: HttpClient, private environment: EnvService, private httpUtility :HttpUtilityService) {
    this.baseUrl = this.environment.serverurl + "/account/login" ;
  }

  login(form: LoginForm) : Observable<LoginResult>{
    //let url: string = "http://localhost:9091/account/login";
    console.log("url= " + this.baseUrl);
    console.log("form.email= " + form.email);
    let params = new HttpParams().
        append('username', form.email).
        append('password', form.password);
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set("Content-Type", "application/x-www-form-urlencoded");
    return this.http.post<LoginResult>(this.baseUrl,{ headers: headers }, { params: params });
  }

  getLoginUser() : Observable<LoginResult>{
    return this.http.get<LoginResult>(this.environment.serverurl  + "/api/login/login-user-info",{ headers: this.httpUtility.getHeader()});
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
    console.log("logout= " + this.isAuthenticated) ;

  }

  getGoogleUrl(){
    return this.environment.googelurl ;
  }

  getLoginedInUserAccount() :AccountDTO {
    return JSON.parse(localStorage.getItem('account')!) ;
  }


}
