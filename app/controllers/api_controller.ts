import express, { Router, Response, Request } from 'express';
import BookService from '../../app/services/bookService';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
      const books = await BookService.getBooks();
      res.json(books);
    } catch (error) {
      res.status(500).send("[ERROR] Unable to get all books");
    }
});

router.post('/', async (req: Request, res: Response) => {
    try{
        const service = new BookService();
        const book = await service.createBook(req);
        res.status(201).send(book);
        console.log("[INFO] Successfull")
    } catch (error) {
        console.error('Error creating book:', error);
        res.status(500).send("[ERROR] Unable to create book");       
    }
});

// Search Book
/* {
  "title": "<title>",
  "publisher": "<publisher>"
} */

router.post('/search', async (req: Request, res: Response) => {
    try {
        const bookService = new BookService();
        const { title, publisher } = req.body;
        if (!title || !publisher) {
          return res.status(400).send('[ERROR] Title and Publisher name are required');
        }
        const book = await bookService.getBook(title as string, publisher as string);
        if (book == null) {
          return res.status(404).send('[ERROR] Book not found');
        }
        if (book.length == 0) {
          return res.status(200).send("This publisher does not own this title")
        }
        res.status(200).send(book);
      } catch (error) {
        console.error('[ERROR] Error fetching book by title and publisher:', error);
        res.status(500).send('[ERROR] Unable to fetch book');
      };
});

//Update book
/* {
  "title": "<title>",
  "publisher": "<publisher>",
  "data": {
    "author": "<author>",
    "year": <year>
    isbn or pages too
  }
} */

router.put('/update', async (req: Request, res: Response) => {
    try {
        const bookService = new BookService();
        const { title, publisher, data } = req.body;
        const book = await bookService.updateBook(title, publisher, data);
        res.status(200).send(book);
      } catch (error) {
        console.error('Error updating book:', error);
        res.status(500).send('[ERROR] Unable to update book');
      }
});

//Delete book
/* {
  "title": "<title>",
  "publisher": "<publisher>"
} */

router.delete('/delete', async (req: Request, res: Response) => {
    try {
        const bookService = new BookService();
        const { title, publisher } = req.body;
        if (!publisher) {
          return res.status(400).send('[ERROR] Publisher name is required');
        }
        await bookService.deleteBook(title, publisher);
        res.status(200).send('[INFO] Successfully deleted book');
      } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).send('[ERROR] Unable to delete book');
      }
});

export default router;