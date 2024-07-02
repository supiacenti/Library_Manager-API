import mongoose, { Schema, Model, Document } from "mongoose";
import Publisher from '../models/publisher'

interface Book extends Document {
    isbn: number;
    pages: number;
    title: string;
    year: number;
    author: string;
    publisher: Publisher;
}

const BookSchema = new Schema<Book>({
      isbn: { type: Number },
      pages: { type: Number },
      title: { type: String, required: true },
      year: { type: Number },
      author: { type: String },
      publisher: { type: String }
    }, { versionKey: false });

class BookModel {
  private static models: { [key: string]: Model<Book> } = {};

  public static getBookModel(publisher: string): Model<Book> {
    if (!this.models[publisher]) {
      this.models[publisher] = mongoose.model<Book>(publisher, BookSchema, publisher);
    }
    return this.models[publisher];
  }
}

export { Book, BookModel };