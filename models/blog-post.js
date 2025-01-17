import { Schema, SchemaTypes, model } from "mongoose";
const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: SchemaTypes.ObjectId
    },
    url: String,
    likes: {
        type: Number,
        default: 0
    }
});

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject._id = returnedObject._id.toString();
    },
});

export const BlogPost = model('Blog', blogSchema);

