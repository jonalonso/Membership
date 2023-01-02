import * as dotenv from 'dotenv'
dotenv.config();

export const {
    DB_USER = 'user1',
    DB_HOST = 'localhost',
    DB_PASSWORD = 'user1',
    DB_DATABASE = 'membership',
    DB_PORT = '5432', 
} = process.env;
