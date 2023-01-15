import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/Book';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  books: Book[] = [];

  totalBooksInCart : number = 0 ;
  isShowingBook:boolean = true ;
  constructor(private booksService: BooksService){}

  ngOnInit(): void {
    this.books = this.booksService.getBooks() ;
    this.booksService.showBookChangedEvent
      .subscribe(
        (flag: boolean) => {
          this.isShowingBook = flag ;
        }
      );
  }

  listenCartNumberChanges(total: any){
    this.totalBooksInCart = total ;
  }




  
}