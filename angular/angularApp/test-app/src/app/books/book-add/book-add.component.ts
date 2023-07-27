import { Component } from '@angular/core';
import { BookServiceService } from 'src/app/services/book-service.service';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.scss']
})
export class BookAddComponent {
  newBook: any = {};
  constructor(private bookService: BookServiceService) {
  }

  addBook(){
    this.bookService.addBook(this.newBook)
    this.newBook = {}
  }
}
