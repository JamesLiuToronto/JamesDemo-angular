import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable} from 'rxjs';
import { LoginForm, RegisterForm } from '../model/Auth';
import { User } from '../../admin/model/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated: boolean = false;
  
  private userSubject: BehaviorSubject<User[]>;
  public user: Observable<User[]>;
  user1: User | undefined;
  errorMsg: string | undefined;
  private nextUserId: number = 0;

  userChangeEmitter = new EventEmitter() ;

  constructor( private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User[]>(JSON.parse(localStorage.getItem('user') || '{}'));
    this.user = this.userSubject.asObservable();
  }
 
  private baseUrl:string = "http://localhost:3000/users" ;

  raiseChangeUserEmitter(data :boolean){
    this.userChangeEmitter.emit(data) ;
  }


  login(form: LoginForm) {

    let url:string = this.baseUrl + "?email=" + form.email + "&&password=" + form.password;
    console.log("url= " + url);
    return this.http.get<User[]>(url);
  }
  
  getUsersHttp() {
    console.log("url= " + this.baseUrl);
    this.user = this.http.get<User[]>(this.baseUrl);
    return this.user ;
  }
  
    
  register(form: RegisterForm) { 
   
    
    const headers = { 'content-type': 'application/json'}  ;
    const inputUser = this.mapUser(form) ;
    console.log("form", form) ;
    const body=JSON.stringify(inputUser);
    console.log("body=" + body)
    return this.http.post(this.baseUrl, body, { headers: headers }) ;
 
  } ;

  setNextUserId(id:number){
    this.nextUserId = id ;
  }
  getNextUserId(){
    return this.nextUserId ;
  }

  mapUser(form: RegisterForm) {
    const inputUser: User = {
      id: 0 ,
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      token: ''
    } ;
    inputUser.id = this.nextUserId;
    inputUser.email = form.email ;
    inputUser.firstName = form.firstName ;
    inputUser.lastName = form.lastName ;
    inputUser.password = form.password ;
    return inputUser ;


  }


  enableAuthenticated() {
    this.isAuthenticated = true;
  }

  disableAuthenticated() {
    this.isAuthenticated = false;
  }

  logout() {
    this.disableAuthenticated();

    localStorage.removeItem('user');

  }


}
