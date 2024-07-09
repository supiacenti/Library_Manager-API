import mongoose, { Document } from "mongoose";
import Publisher from '../models/publisher'
import { BookModel } from '../models/book'

class BookService {
    public async createBook(req: any) {
        const publisher = new Publisher(req.body.publisher);
        const publisherName = publisher.toString();

        const Book = BookModel.getBookModel(publisherName);

        const newBook = new Book({
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

    public static async getBooks() {
        const collectionToIgnore = 'Employees';
        try {
          const collections = await mongoose.connection.db.listCollections().toArray();
          const filteredCollections = collections.filter(collection => collection.name !== collectionToIgnore);
          const booksPromises = filteredCollections.map(async (collection) => {
            const Book = BookModel.getBookModel(collection.name);
            return await Book.find().exec();
          });
      
          const booksArrays = await Promise.all(booksPromises);
          return booksArrays.flat();
        } catch (error) {
          throw new Error(`Error fetching books: ${error}`);
        }
    }

    public async getBook(title: string, publisher: string) {
        try {
            const Book = BookModel.getBookModel(publisher);
            return await Book.find({ title }).exec();
          } catch (err) {
            throw new Error(`Error finding books: ${err}`);
          }
    }

    public async updateBook(title: string, publisher: string, data: any) {
        try {
            const Book = BookModel.getBookModel(publisher);
            return await Book.updateOne({ title }, { $set: data });
          } catch (err) {
            throw new Error(`Error updating book: ${err}`);
          }
    }

    public async deleteBook(title: string, publisher: string) {
        try {
            const Book = BookModel.getBookModel(publisher);
            return await Book.deleteOne({ title });
        } catch (err) {
            throw new Error(`Error deleting book: ${err}`);
        }
    }
}

export default BookService;