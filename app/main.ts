import express, { Response, Request } from 'express';
import databaseConnection from './adapters/dbconnect';
import router from './controllers/api_controller';
import path from 'path';

const app = express();
const PORT = 3000;

app.use(express.json());

const StartServer = async () => {
    try {
        console.log(router)
        const connection = await databaseConnection();

        connection.on('error', (err) => {
            console.error('[ERROR] Connection failed.', err);
        });
        connection.once('open', () => {
            console.log('[INFO] Successful database connection.');
        });

        app.use('/books', router);

        app.use(express.static(path.join(__dirname, 'static')));

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}!`);
        });
    } catch (error) {
        console.log('[ERROR] Server startup failed: ', error);
    }
};

StartServer();