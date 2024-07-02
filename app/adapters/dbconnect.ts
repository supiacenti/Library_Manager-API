import mongoose, { mongo } from 'mongoose'
import dotenv from 'dotenv';

dotenv.config();

//console.log('Connection String:', process.env.CONNECTION_STR);

async function databaseConnection(){
    try {
        mongoose.connect(process.env.CONNECTION_STR as string);
        console.log('[INFO] Database connected successfully');
    }
    catch (error) {
        console.error('[ERROR] Database connection error:', error);
        process.exit(1);
    }
    return mongoose.connection;
};

// Estrutura do Banco de Dados: isbn, pages, publisher, title, year, author

export default databaseConnection;