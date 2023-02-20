import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AccountRegistrationDTO, LoginForm, LoginResult} from '../model/Auth';
import { Observable } from 'rxjs';
import { EnvService } from 'src/app/shared/service/env.service';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  private errorMsg:string = "Sign up failed, detail error is: ";
  result: boolean = false ;
  baseUrl :string = "url" ;

  constructor(private http: HttpClient, private environment: EnvService) {
    this.baseUrl = this.environment.serverurl + "/account/registration" ;
  }

  signUp(dto:AccountRegistrationDTO) : Observable<any>{
    //let url: string = "http://localhost:9091/account/registration";
    const headers = new HttpHeaders()
      .set('content-type', 'application/json') ;
      //.set("Content-Type", "application/x-www-form-urlencoded");
    return this.http.post<any>(this.baseUrl,dto, {headers:headers});
  }

  

}
