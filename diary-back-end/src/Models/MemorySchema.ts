import mongoose from "mongoose";

const MemorySchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        min:5,
        max:255,
    },
    subtitle:{
        type:String,
        required:false,
        min:5,
        max:255,
    },
    content:{
        type:String,
        required:true,
        min:6
    },
    tags:{
        type:Array<String>,
        default: [],
    },
    date:{
        type: Date,
        default: Date.now,
        required:true
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }
});

const Memory = mongoose.model('Memory', MemorySchema);

export default Memory;