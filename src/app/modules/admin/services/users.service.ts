import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { User } from '../model/User';
import { Observable, shareReplay } from 'rxjs';
import { HttpUtilityService } from 'src/app/shared/service/http-utility.service';
import { EnvService } from 'src/app/shared/service/env.service';
import { Pager } from 'src/app/shared/dto/Pager';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  isAuthenticated: boolean = false;
  selectedUser: User |undefined ;
    
  errorMsg: string | undefined;


  private baseUrl:string = "url" ;

  constructor( private http: HttpClient, private httpUtility :HttpUtilityService, 
    private environment: EnvService) {
    this.baseUrl = this.environment.serverurl ;
  }
 

  getUserList() : Observable<User[]>{
    return this.http.get<User[]>(this.baseUrl + "/api/account",{ headers: this.httpUtility.getHeader()}).pipe(shareReplay());
  }

  getUserListWithSortOnly(sortField:string, direction:number ) : Observable<User[]>{
    return this.http.get<User[]>(this.baseUrl + "/api/account/0/sort/" + sortField + "/" + direction,{ headers: this.httpUtility.getHeader()}).pipe(shareReplay());
  }

  getUserListWithPagenition(sortField:string, direction:number, offset:number, pageSize:number ) : Observable<Pager>{
    return this.http.get<Pager>(this.baseUrl + "/api/account/0/page/" + sortField + "/" + direction + "/" + offset + "/" + pageSize,
                                { headers: this.httpUtility.getHeader()}).pipe(shareReplay());
  }

  getUserById(userAccountId:number) : Observable<User>{
    return this.http.get<User>(this.baseUrl + "/api/account/" + userAccountId,{ headers: this.httpUtility.getHeader()}).pipe(shareReplay());
  }
  
  setSelectedUser(user :User){
    this.selectedUser = user ;
  }
  getSelectedUser(){
    return this.selectedUser ;
  }
  
}
