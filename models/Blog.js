import { Schema, model } from "mongoose";
const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: String,
    url: String,
    likes: {
        type: Number,
        default: 0
    }
});

export const Blog = model('Blog', blogSchema);

