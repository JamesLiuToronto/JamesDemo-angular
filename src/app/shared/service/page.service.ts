import { Injectable } from '@angular/core';
import { Pager } from '../dto/Pager';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  

  page:Pager |undefined ; 

  constructor() { 
    
  }

  setPage(page: Pager){
    this.page = page ;
    return this.page.content ;
  }


}
