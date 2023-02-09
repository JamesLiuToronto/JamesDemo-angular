import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from '../model/User';
import { delay, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  isAuthenticated: boolean = false;
  selectedUser: User |undefined ;
    
  errorMsg: string | undefined;
  private nextUserId: number = 0;

  userChangeEmitter = new EventEmitter() ;

  constructor( private http: HttpClient) {
  
  }
 
  private baseUrl:string = "http://localhost:9091/api/account" ;

  raiseChangeUserEmitter(data :boolean){
    this.userChangeEmitter.emit(data) ;
  }

  // getUsers() {
  //   console.log("url= " + this.baseUrl);
  //   return this.http.get<User[]>(this.baseUrl).pipe(delay(500));
    
  // }

  getUserList() : Observable<User[]>{
    return this.http.get<User[]>(this.baseUrl,{ headers: this.getHeader()});
  }

  activateUser() : Observable<User>{
    let url = this.baseUrl + "/" + this.selectedUser?.userId + "/activate"
    return this.http.put<User>(url, null, { headers: this.getHeader() });
  }

  deactivateUser() : Observable<User>{
    let url = this.baseUrl + "/" + this.selectedUser?.userId + "/deactivate"
    return this.http.put<User>(url, null, { headers: this.getHeader() });
  }

  getHeader(): HttpHeaders{
    const auth_token = localStorage.getItem('token') ; 
    console.log("token=" + auth_token) ;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return headers;
  }


  setSelectedUser(user :User){
    this.selectedUser = user ;
  }
  getSelectedUser(){
    return this.selectedUser ;
  }
  
}
