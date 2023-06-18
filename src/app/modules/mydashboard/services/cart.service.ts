import { EventEmitter, Injectable } from '@angular/core';
import { Book } from '../models/Book' ;

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: Map<String, Book> = new Map<String, Book>() ;
  totalBooksInCart: number = 0 ;
  showCartChangedEvent = new EventEmitter<boolean>();

  constructor() { }

   addToCart(book :Book){
      this.cart.set(book.name, book) ;
      this.totalBooksInCart = this.cart.size ;
     
  }

  RemoveFromCart(book :Book){
    this.cart.delete(book.name);
    this.totalBooksInCart = this.cart.size ;
  }

  IsInCart(name :string){
    return this.cart.has(name) ;
  }

  getBooksFromCart(){
    return this.cart ;
  }

}
