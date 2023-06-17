import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { User } from '../model/User';
import { Observable, shareReplay } from 'rxjs';
import { HttpUtilityService } from 'src/app/shared/service/http-utility.service';
import { EnvService } from 'src/app/shared/service/env.service';
import { PageFilter, Pager } from 'src/app/shared/dto/Pager';
import { PageService } from 'src/app/shared/service/page.service';
import { UsersFilterService } from './usersFilter.service';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  isAuthenticated: boolean = false;
  selectedUser: User |undefined ;
    
  errorMsg: string | undefined;
  filters:PageFilter[]|undefined ;


  private baseUrl:string = "url" ;

  constructor( private http: HttpClient, private httpUtility :HttpUtilityService, 
    private environment: EnvService, private pageService:PageService, private usersFilterService:UsersFilterService ) {
    this.baseUrl = this.environment.serverurl ;
  }
 

  getUserList() : Observable<User[]>{
    return this.http.get<User[]>(this.baseUrl + "/api/account",{ headers: this.httpUtility.getHeader()}).pipe(shareReplay());
  }

  getUserListWithSortOnly(sortField:string, direction:number ) : Observable<User[]>{
    return this.http.get<User[]>(this.baseUrl + "/api/account/sort/" + sortField + "/" + direction,{ headers: this.httpUtility.getHeader()}).pipe(shareReplay());
  }

  getUserListWithPagenition(sortField:string, direction:number, offset:number, pageSize:number, filter:PageFilter ) : Observable<Pager>{

    return this.http.get<Pager>(this.baseUrl + "/api/account/page/" + sortField + "/" + direction + "/" + offset + "/" + pageSize,
                                { params:this.usersFilterService.getHttpParamsForUserList(filter), headers: this.httpUtility.getHeader()}).pipe(shareReplay());
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
