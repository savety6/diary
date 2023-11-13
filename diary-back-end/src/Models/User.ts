import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:5,
        max:255,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        min:6
    },
    diaryEntries:{
        type: Date,
        default: Date.now,
        required:true
    }
});

const User = mongoose.model('User', UserSchema);

export default User;