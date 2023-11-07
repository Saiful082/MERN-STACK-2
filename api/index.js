import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js'

mongoose.connect(process.env.MONGO)
        .then( () => {
         console.log('connected to the mongodb');
})
        .catch( (error) => {
            console.log(error);
        });

const app = express();

app.use(express.json());

app.listen(5000, () => {
console.log('Server is running on port 5000');
    }
);  

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);