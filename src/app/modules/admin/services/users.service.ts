import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from '../model/User';
import { delay, Observable } from 'rxjs';
import { HttpUtilityService } from 'src/app/shared/service/http-utility.service';
import { SimpleResultDTO } from 'src/app/shared/models/SimpleResultDTO';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  isAuthenticated: boolean = false;
  selectedUser: User |undefined ;
    
  errorMsg: string | undefined;
  private nextUserId: number = 0;

  userChangeEmitter = new EventEmitter() ;

  constructor( private http: HttpClient, private httpUtility :HttpUtilityService) {
  
  }
 
  private baseUrl:string = "http://localhost:9091" ;

  raiseChangeUserEmitter(data :boolean){
    this.userChangeEmitter.emit(data) ;
  }

  getUserList() : Observable<User[]>{
    return this.http.get<User[]>(this.baseUrl + "/api/account",{ headers: this.httpUtility.getHeader()});
  }

  activateUser() : Observable<User>{
    let url = this.baseUrl + "/api/account/" + this.selectedUser?.userId + "/activate"
    return this.http.put<User>(url, null, { headers: this.httpUtility.getHeader() });
  }

  deactivateUser() : Observable<User>{
    let url = this.baseUrl + "/api/account/" + this.selectedUser?.userId + "/deactivate"
    return this.http.put<User>(url, null, { headers: this.httpUtility.getHeader() });
  }

  getActivateToken() : Observable<SimpleResultDTO>{
    return this.http.get<SimpleResultDTO>(this.baseUrl + "/api/login/activate-token/" + this.selectedUser?.userId,{ headers: this.httpUtility.getHeader()});
  }

  processActivateToken(token:string) : Observable<string>{
    return this.http.get<string>(this.baseUrl + "/process/" + token);
  }

  setSelectedUser(user :User){
    this.selectedUser = user ;
  }
  getSelectedUser(){
    return this.selectedUser ;
  }
  
}
