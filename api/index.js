import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import userRouter from './routes/user.route.js';

mongoose.connect(process.env.MONGO)
        .then( () => {
         console.log('connected to the mongodb');
})
        .catch( (error) => {
            console.log(error);
        });

const app = express();

app.listen(5000, () => {
console.log('Server is running on port 5000');
    }
);  


app.use('/api/user', userRouter)