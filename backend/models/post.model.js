import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    content: {
        type : String,
        default: ' ',
        trim: true,
        require: true
    },
    comments: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comments',
        trim: true
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],

    publishedDate: Date,

}, {timestamps: true});