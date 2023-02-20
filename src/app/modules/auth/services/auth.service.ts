import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { LoginForm, LoginResult} from '../model/Auth';
import { Observable } from 'rxjs';
import { EnvService } from 'src/app/shared/service/env.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginErrorMessage: string = "Login failed, email password not match";
  errorMsg: string | undefined;
  result: boolean = false ;
  baseUrl: string ="url" ;

  constructor(private http: HttpClient, private environment: EnvService) {
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

 

  enableAuthenticated() {
    localStorage.setItem('isAuthenticated', 'true');
  }

  disableAuthenticated() {
    localStorage.setItem('isAuthenticated', 'false');
  }
  isAuthenticated(){
    return localStorage.getItem('isAuthenticated')== "true";
  }
  

  logoutService() {
    this.disableAuthenticated();
    localStorage.removeItem('userId');
    console.log("logout= " + this.isAuthenticated) ;

  }


}
