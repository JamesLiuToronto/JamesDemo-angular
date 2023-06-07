
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { PageService } from '../../service/page.service';
import { Pager } from '../../dto/Pager';


@Component({
  selector: 'app-pagination',
  standalone: true,
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  imports: [CommonModule],
})
export class PaginationComponent {
  page:Pager|undefined ;  
  constructor(private pageService: PageService){

  }
  

  items: number[] = [];
  leftMany: boolean|undefined ;
  rightMany:boolean|undefined ;
  
  ngOnInit(): void {

    this.pageService.dataChangeEvent
      .subscribe(
        (flag: boolean) => {
          this.page = this.pageService.page ;
          this.fullDisplay(this.page?.number! );
        }
      );
    
  }

  isLeftMany(){
    return (this.getCurrentPageNumber() - 2) < 0 ? false : true ;

  }

  isRightMany(){
    return (this.getCurrentPageNumber() + 2 >= this.getTotalPages()!)? false :true;
  }

  isPrevious(){
    return (this.getCurrentPageNumber() < 1) ? false :  true ; 
  }

  isNext(){
    return (this.getCurrentPageNumber() >= this.getTotalPages()! -1) ? false :  true ; 
  }

  isCurrentPageNumber(page:number){
    return page == this.getCurrentPageNumber() ;
  }

  getFirstPageNumberInMiddle(currentPage:number){
    return (currentPage == 0) ? 0 : currentPage -1 ;
  }

  getLastPageNumberInMiddle(firstPage:number){
    if (firstPage + 2 <= this.getTotalPages()! -1 ) return firstPage + 2 ;
    return (firstPage + 1 <= this.getTotalPages()! -1 ) ? firstPage + 1 : firstPage ;
  }

  fullDisplay(page:number){
    this.items = [];
    let j = 0 ;
    let first = this.getFirstPageNumberInMiddle(page) ;
    let last = this.getLastPageNumberInMiddle(first) ;
    for (let i = first; i <= last; i++) {
        this.items[j] = i+ 1;
        j++ ;
      }
  }


  ngOnChanges(changes: SimpleChanges) {
      // set page when items array first set or changed
      if (changes['items'].currentValue !== changes['items'].previousValue) {
          //this.setPage(this.initialPage!);
      }
  }

  getPreviousPageNumber(){
    if (!this.isPrevious) return this.getCurrentPageNumber() ;
    return (this.getCurrentPageNumber() == 0) ? 0 :  this.getCurrentPageNumber() - 1 ; 
  }

  getNextPageNumber(){
    return (this.isNext()) ? this.getCurrentPageNumber() + 1 :this.getCurrentPageNumber() ; 
  }

  getLeftManyPageNumber(){
    if (!this.isLeftMany()) return this.getCurrentPageNumber() ;
    return this.getCurrentPageNumber() - 2 ;
  }

  getRightManyPageNumber(){
    if (!this.isRightMany()) return this.getCurrentPageNumber() ;
    return this.getCurrentPageNumber() + 2 ;
  }

  
  setPage(page: number) {
      
      // get new pager object for specified page
     // this.pager = this.paginate(this.items.length, page, this.pageSize, this.maxPages);

      // call change page function in parent component
      if (page == this.getCurrentPageNumber()) {
        return ;
      } 

      this.pageService.pageChangeEvent.emit(page);
  }

 
  isPageable(){
    if (this.getTotalPages()! < 2)
    {
        return false ;
    }
    return true;
  }

  getFirstElementOnPage(){
    return this.getFirstElementOfCurrentPage()!;
  }

  getLastElementOnPage(){
    return this.getFirstElementOfCurrentPage() + this.getPageSize()! >= this.getTotalElements()!?
    this.getTotalElements()!-1 : this.getFirstElementOfCurrentPage() + this.getPageSize()! - 1;
  }

  
  getCurrentPageNumber(){
    return this.page?.pageable.pageNumber!   ;
  }

  getLastPageNumber(){
    return this.page?.totalPages! - 1 ;
  }

  getTotalPages(){
    return this.page?.totalPages ;
  }
  getTotalElements(){
    return this.page?.totalElements ;
  }
  getFirstElementOfCurrentPage(){
    return this.page?.pageable.offset! 
  }
  getPageSize(){
    return this.page?.size
  }
}
