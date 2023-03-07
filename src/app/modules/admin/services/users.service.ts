import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../model/User';
import { Observable } from 'rxjs';
import { HttpUtilityService } from 'src/app/shared/service/http-utility.service';
import { EnvService } from 'src/app/shared/service/env.service';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  isAuthenticated: boolean = false;
  selectedUser: User |undefined ;
    
  errorMsg: string | undefined;


  private baseUrl:string = "url" ;

  constructor( private http: HttpClient, private httpUtility :HttpUtilityService, private environment: EnvService) {
    this.baseUrl = this.environment.serverurl ;
  }
 

  getUserList() : Observable<User[]>{
    return this.http.get<User[]>(this.baseUrl + "/api/account",{ headers: this.httpUtility.getHeader()});
  }
  
  setSelectedUser(user :User){
    this.selectedUser = user ;
  }
  getSelectedUser(){
    return this.selectedUser ;
  }
  
}
