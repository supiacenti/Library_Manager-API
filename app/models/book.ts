import Publisher from '../entities/publisher.ts';

class Book {
    // Estrutura do Banco de Dados: isbn, pages, publisher, title, year, author
    isbn: number;
    pages: number;
    publisher: Publisher;
    title: string;
    year: number;
    author: string;

    constructor(title: string, author: string, pages: number, isbn: number, year: number, publisher: Publisher){
        this.isbn = isbn;
        this.pages = pages;
        this.publisher = Publisher;
        this.title = title;
        this.year = year;
        this.author = author;
    };

    toStringBooks(){
        console.log("Book: ${this.title}\nAuthor: ${this.author}")
    }
}

export default Book;