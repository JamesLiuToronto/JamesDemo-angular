import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { LoginForm, LoginResult} from '../model/Auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginErrorMessage: string = "Login failed, email password not match";
  loginAccount: LoginResult | undefined;
  errorMsg: string | undefined;

  constructor(private http: HttpClient) {

  }


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
          return true;
        }
        console.log("wrong path=" + encodeURI(JSON.stringify(this.loginAccount))) ;
        return false;
        
      }, (error) => {
        this.loginErrorHandler(error)
        console.log("error happened")
        return false;
      });
    return false;
  }

  private loginErrorHandler(error: any) {
    alert("login failed" + error.message);
    console.log("catch error =" + error.errorMessage);
  }

  enableAuthenticated() {
    localStorage.setItem('isAuthenticated', 'true');
  }

  disableAuthenticated() {
    localStorage.setItem('isAuthenticated', 'false');
  }
  isAuthenticated(){
    return localStorage.getItem('isAuthenticated');
  }
  

  logout() {
    this.disableAuthenticated();
    localStorage.removeItem('userId');

  }


}
