import { Injectable } from '@angular/core';
import { HttpParams} from '@angular/common/http';
import { PageFilter } from 'src/app/shared/dto/Pager';
import { PageFilterService } from 'src/app/shared/service/pageFilter.service';

@Injectable({
  providedIn: 'root'
})
export class UsersFilterService {

  
  filters:PageFilter[]|undefined ;

  constructor( private pageFilterService:PageFilterService) {
   
  }
  
  public getHttpParamsForUserList(filter:PageFilter): HttpParams {
    let filterString = JSON.stringify(filter);
    let httpParams = new HttpParams();
    httpParams = httpParams.append("filterJsonString", filterString );
    return httpParams;
  }
  
  getUserFilters(){

    this.filters = [] ;
    this.filters.push(this.pageFilterService.getInitPageFilter()) ;

    this.filters.push({ 
      active:true,
      fieldName: 'emailAddress',
      fieldType: 'string',
      fieldValue: '',
      fromValue: 0,
      toValue: 0,
      displayName: 'Email',
      optionalList:'NA'
    }) ;

    this.filters.push({ 
      active:true,
      fieldName: 'userStatus',
      fieldType: 'string',
      fieldValue: '',
      fromValue: 0,
      toValue: 0,
      displayName: 'Status',
      optionalList: 'ACTIVE,PENDING,DISABLE'
    }) ;

    this.filters.push({
      active:true,
      fieldName: 'firstName',
      fieldType: 'string',
      fieldValue: '',
      fromValue: 0,
      toValue: 0,
      displayName: 'First Name',
      optionalList:'NA'
    }) ;

    this.filters.push(
      {
        active:true,
        fieldName: 'lastName',
        fieldType: 'number',
        fieldValue: '',
        fromValue: 0,
        toValue: 0,
        displayName: 'Last Name',
        optionalList:'NA'
      }
    ) ;
    return this.filters ;  
  }
  
}
