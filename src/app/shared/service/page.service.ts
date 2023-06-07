import { EventEmitter, Injectable } from '@angular/core';
import { Pager } from '../dto/Pager';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  pageChangeEvent = new EventEmitter<any>();
  dataChangeEvent = new EventEmitter<boolean>();

  page:Pager |undefined ; 

  constructor() { 
    
  }

  setPage(page: Pager): any[]{
    this.page = page ;
    return this.page.content ;
   
  }

  
}
