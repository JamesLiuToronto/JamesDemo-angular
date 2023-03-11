import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../../../models/Book';
import { CartService } from '../../../services/cart.service';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  @Input() book: Book = {} as Book;
  //@Output() totalInCartChange = new EventEmitter<any>();
  isInCart: boolean = false ;

  constructor(private cartService: CartService){}
  ngOnInit(): void {
    this.isInCart = this.checkInCart() ;
    //this.totalInCartChange.emit(this.getTotalBooksInCart());
  }

  addToCart(){
    this.cartService.addToCart(this.book);
    this.isInCart = true ;
    //this.totalInCartChange.emit(this.getTotalBooksInCart());
  }

  removeFromCart(){
    this.cartService.RemoveFromCart(this.book) ;
    this.isInCart = false ;
   // this.totalInCartChange.emit(this.getTotalBooksInCart());
  }

  getTotalBooksInCart(){
    return this.cartService.getBooksFromCart().size ;
  }

  checkInCart(){

    return this.cartService.IsInCart(this.book.name);
    
  }

  openInfo(){
    
  }

  
}
