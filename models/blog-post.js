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
    transform: (document, returnedObject) => {
        returnedObject._id = returnedObject._id.toString(); // Add id as a string
        delete returnedObject.__v
    },
});

export const BlogPost = model('Blog', blogSchema);

