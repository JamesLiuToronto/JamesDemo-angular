import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/Book';
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(private cartService: CartService){}

  isShowingCart: boolean = true;

  ngOnInit(): void {
    this.cartService.showCartChangedEvent
      .subscribe(
        (flag: boolean) => {
          this.isShowingCart = flag ;
        }
      );
  }

  cart : Book[] = [] ;

  getBooksInCart(){
    return this.cartService.getBooksFromCart() ;
  }
 
}
