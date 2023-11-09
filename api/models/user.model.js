import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
       
    },
    avatar: {
        type: String,
        default: 'https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659651_640.png',
    } 
}, 
{timeseries: true});

const User = mongoose.model('User', userSchema);

export default User;