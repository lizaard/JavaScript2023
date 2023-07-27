import { Component } from '@angular/core';
import { BookServiceService } from 'src/app/services/book-service.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent {
  bookList: any[] = [];
  searchTerm: string = '';
  constructor(private bookServer: BookServiceService) {
    this.bookList = this.bookServer.getBooks();
  }

  deteleBook(index: number) {
    this.bookServer.deleteBook(index);
  }

  filterBooks() {
    return this.bookList.filter(
      (book) =>
        book.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
