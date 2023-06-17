import { EventEmitter, Injectable } from '@angular/core';
import { PageFilter, Pager } from '../dto/Pager';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  pageChangeEvent = new EventEmitter<any>();
  dataChangeEvent = new EventEmitter<boolean>();
  pageSizeChangeEvent = new EventEmitter<number>();
  filterChangeEvent = new EventEmitter<PageFilter>();

  page:Pager |undefined ; 

  constructor() { 
    
  }

  setPage(page: Pager): any[]{
    this.page = page ;
    console.log("service page=" + JSON.stringify(this.page.content)) ;
    return this.page.content ;
   
  }

  getInitPageFilter(){
    const filter: PageFilter = {
      active:false,
      fieldName: 'NA',
      fieldType: 'string', 
      fieldValue: 'null',
      fromValue: 0,
      toValue:0,
      displayName: "No Filter",
      optionalList:'NA'

    };
    return filter ;
  }

  public getFilterByName(name:string, filterSelections:PageFilter[]) :PageFilter{
    return filterSelections?.find(x=>x.fieldName == name)!;
  }

  
}
