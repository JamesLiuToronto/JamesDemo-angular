import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../model/User';
import { Observable } from 'rxjs';
import { HttpUtilityService } from 'src/app/shared/service/http-utility.service';
import { SimpleResultDTO } from 'src/app/shared/models/SimpleResultDTO';
import { EnvService } from 'src/app/shared/service/env.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  
  errorMsg: string | undefined;


  private baseUrl:string = "url" ;

  constructor( private http: HttpClient, private httpUtility :HttpUtilityService, private environment: EnvService) {
    this.baseUrl = this.environment.serverurl ;
  }
 

  activateUser(user:User) : Observable<User>{
    let url = this.baseUrl + "/api/account/" + user.userId + "/activate"
    return this.http.put<User>(url, null, { headers: this.httpUtility.getHeader() });
  }

  deactivateUser(user:User, reason:string) : Observable<User>{
    let url = this.baseUrl + "/api/account/" + user.userId + "/deactivate"
    let params = new HttpParams().
        append('reason', reason);
    return this.http.put<User>(url, null, { headers: this.httpUtility.getHeader(),  params: params });
  }

  getActivateToken(user:User) : Observable<SimpleResultDTO>{
    return this.http.get<SimpleResultDTO>(this.baseUrl + "/api/login/activate-token/" + user.userId,{ headers: this.httpUtility.getHeader()});
  }

  getResetPasswordToken(emailAddress:String) : Observable<SimpleResultDTO>{

    let url = this.baseUrl + "/process/reset-password?email=" + emailAddress +  "&baseurl=" + this.environment.baseurl ;
    return this.http.post<SimpleResultDTO>(url, null );
  }


  processActivateToken(token:string) : Observable<string>{
    return this.http.get<string>(this.baseUrl + "/process/" + token);
  }

  updateEmail(user:User, emailAddress:string) : Observable<User>{
    let url = this.baseUrl + "/api/account/" + user.userId + "/emailaddress" ;
    let jsonString = '{ "email":"' + emailAddress + '"}' ;
    return this.http.put<User>(url, JSON.parse(jsonString), { headers: this.httpUtility.getHeader() });
  }

  updatePersonInfo(user:User, firstName:string, lastName:String) : Observable<User>{
    let url = this.baseUrl + "/api/account/" + user.userId + "/personinfo" ;
    let jsonString = '{ "firstName":"' + firstName + '", "lastName":"' + lastName+ '"}' ;
    return this.http.put<User>(url, JSON.parse(jsonString), { headers: this.httpUtility.getHeader() });
  }

  updateUserGroup(user:User, groupTypes:string) : Observable<User>{
    let url = this.baseUrl + "/api/account/" + user.userId + "/usergroups?group-type-list=" + groupTypes ;
    return this.http.post<User>(url, null, { headers: this.httpUtility.getHeader() });
  }
}
