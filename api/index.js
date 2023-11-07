import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


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
