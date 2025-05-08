import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import booksRoute from './routes/booksRoute.js';
import userRoute from './routes/userRoute.js';

dotenv.config();
const app = express();

app.use(express.json());


app.use(cors({
  origin: 'https://front-end-book-store-app.vercel.app',
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
}));


app.get('/', (req, res) => res.status(200).send('Welcome to MERN Stack Tutorial!'));
app.use('/books', booksRoute);
app.use('/user', userRoute);


const PORT = process.env.PORT || 5555;
mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => {
    console.log('Connected to database');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => console.error('Database connection error:', err.message));
