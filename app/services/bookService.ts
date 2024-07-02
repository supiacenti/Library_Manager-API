import mongoose from "mongoose";
import Publisher from '../entities/publisher'

class BookService {

    private createBookSchema() {
        return new mongoose.Schema({
          isbn: { type: Number },
          pages: { type: Number },
          title: { type: String, required: true },
          year: { type: Number },
          author: { type: String },
          publisher: { type: String }
        }, { versionKey: false });
    }


    public async createBook(req: any) {
        const publisher = new Publisher(req.body.publisher);
        const publisherName = publisher.toString();

        const bookSchema = this.createBookSchema();

        const BookModel = mongoose.model(publisherName, bookSchema);

        const newBook = new BookModel({
            isbn: req.body.isbn,
            pages: req.body.pages,
            title: req.body.title,
            year: req.body.year,
            author: req.body.author,
            publisher: publisherName
        });

        await newBook.save();
        return newBook;
    }
}

export default BookService;