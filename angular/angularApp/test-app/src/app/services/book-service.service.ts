import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookServiceService {

  private bookes: any[] = [
    { title: 'Carte 1', author: 'Autor 1', year: 2000 },
    { title: 'Carte 2', author: 'Autor 2', year: 2010 },
  ]
  constructor() { }

  getBooks(){
    return this.bookes;
  }

  addBook(book:any){
    this.bookes.push(book)
  }

  deleteBook(index:number){
    this.bookes.splice(index, 1);
  }
}
