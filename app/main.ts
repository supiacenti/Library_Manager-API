import express, { Response, Request } from 'express';
import databaseConnection from "./adapters/dbconnect";
import Book from '../app/models/book'
import BookService from '../app/services/bookService'


const startServer = async () => {
    try {
        // Conexão com o Banco de Dados MongoDB
        const connection = await databaseConnection();

        connection.on("error", (err) => {
            console.error("[ERROR] Connection Failed", err);
        });

        connection.once("open", () => {
            console.log("[INFO] Successfull database connection")
        })

        // Criação de app
        const app = express();
        const PORT = 3000;
        app.use(express.json());

        // Listener
        app.listen(PORT, () => {
            console.log("Servidor escutando!");
          });
          
        // Routers
        app.get("/", (req, res) => {
            res.status(200).send("Main Page")
        });

        app.get("/books", (req, res) => {
            //
        })

        app.post("/books", async (req: Request<Book>, res: Response) => {
            try {
                const service = new BookService();
                const book = await service.createBook(req);
                res.status(201).send(book);
                console.log("[INFO] Successfull")
              } catch (error) {
                console.error('Error creating book:', error);
                res.status(500).send("[ERROR] Unable to create book");
              }
        })

        app.get("/books/:id", (req, res) => {
            //
        })

        app.put("/books/:id", (req, res) => {
            //
        })

        app.delete("/books/:id", (req, res) => {
            //
        })
    }
    catch (error) {
        //
    }
}

startServer();