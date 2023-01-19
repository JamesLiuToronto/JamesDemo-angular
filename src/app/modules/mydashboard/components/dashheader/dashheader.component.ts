import { Component, OnInit} from '@angular/core';
import { BooksService } from '../../services/books.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-dashheader',
  templateUrl: './dashheader.component.html',
  styleUrls: ['./dashheader.component.scss']
})
export class DashheaderComponent implements OnInit{

  constructor(private booksService:BooksService, private cartService:CartService){

  }

  isShowingCart :boolean = true ;
  isShowingBook :boolean = true ;
  ngOnInit(): void {
    this.isShowingCart = true ;
    this.isShowingBook = true ;
  }


 changeShowBookFlag(){
    this.isShowingBook = !this.isShowingBook ;
    this.booksService.changeShowBookFlag(this.isShowingBook) ;
 }

 changeShowCartFlag(){
  this.isShowingCart = !this.isShowingCart ;
  this.cartService.showCartChangedEvent.emit(this.isShowingCart) ;
}

}
