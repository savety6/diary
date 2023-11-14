import mongoose from "mongoose";
import  bcrypt from 'bcrypt';

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

UserSchema.pre('save', async function(next){
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
    this.password = await bcrypt.hash(this.password, salt);

    next();
});

UserSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', UserSchema);

export default User;