import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../model/User';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  isAuthenticated: boolean = false;
  
    
  errorMsg: string | undefined;
  private nextUserId: number = 0;

  userChangeEmitter = new EventEmitter() ;

  constructor( private http: HttpClient) {
  
  }
 
  private baseUrl:string = "http://localhost:3000/users" ;

  raiseChangeUserEmitter(data :boolean){
    this.userChangeEmitter.emit(data) ;
  }

  getUsers() {
    console.log("url= " + this.baseUrl);
    return this.http.get<User[]>(this.baseUrl);
  }
  
  setNextUserId(id:number){
    this.nextUserId = id ;
  }
  getNextUserId(){
    return this.nextUserId ;
  }



}
