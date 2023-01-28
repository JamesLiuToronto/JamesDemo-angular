import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { LoginForm, LoginResult} from '../model/Auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginErrorMessage: string = "Login failed, email password not match";
  errorMsg: string | undefined;
  result: boolean = false ;

  constructor(private http: HttpClient) {

  }

  login(form: LoginForm) : Observable<LoginResult>{
    let url: string = "http://localhost:9091/login";
    //let url: string = "http://localhost:4200/api/signin";
    console.log("url= " + url);
    console.log("form.email= " + form.email);
    let params = new HttpParams().
        append('username', form.email).
        append('password', form.password);
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set("Content-Type", "application/x-www-form-urlencoded");
    return this.http.post<LoginResult>(url,{ headers: headers }, { params: params });
  }

/*
  login(form: LoginForm): boolean {

    let url: string = "http://localhost:9091/login";
    //let url: string = "http://localhost:4200/api/signin";
    console.log("url= " + url);
    console.log("form.email= " + form.email);
    let params = new HttpParams().
        append('username', form.email).
        append('password', form.password);
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set("Content-Type", "application/x-www-form-urlencoded");
    this.http.post<LoginResult>(url,{ headers: headers }, { params: params }).
      subscribe(u => {
        this.loginAccount = u;
        
        if (this.loginAccount != undefined){
          localStorage.setItem('userId', this.loginAccount.userId.toString());
          localStorage.setItem('token', this.loginAccount.token);
          localStorage.setItem('account', encodeURI(JSON.stringify(this.loginAccount.account)));
          console.log("userid=" + localStorage.getItem('userId'));
          this.enableAuthenticated();
          console.log("before return true") ;
          this.result = true ;
         
        } else {
          console.log("wrong path=" + encodeURI(JSON.stringify(this.loginAccount))) ;
          this.result = false ;
        }
        
      }, (error) => {
        this.loginErrorHandler(error)
        console.log("error happened")
        this.result = false ;;
      });
      console.log("service return=" + this.result) ;
      return this.result ;

  }
  */

  

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
