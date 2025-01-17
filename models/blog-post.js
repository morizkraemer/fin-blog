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

blogSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret._id = ret._id.toString(); // Add id as a string
    },
});

export const BlogPost = model('Blog', blogSchema);

