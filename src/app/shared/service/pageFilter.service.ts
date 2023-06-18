import { EventEmitter, Injectable } from '@angular/core';
import { PageFilter } from '../dto/Pager';

@Injectable({
  providedIn: 'root'
})
export class PageFilterService {

  filterChangeEvent = new EventEmitter<PageFilter>();

  
  constructor() { 
    
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
