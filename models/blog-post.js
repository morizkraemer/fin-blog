import { Schema, SchemaTypes, model } from "mongoose";
import { User } from "./blog-users.js";
const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: SchemaTypes.ObjectId,
        ref: "User"
    }
    ,
    url: String,
    likes: {
        type: Number,
        default: 0
    },

});

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject._id = returnedObject._id.toString();
    },
});

blogSchema.post('save', async (document) => {
await User.findByIdAndUpdate(document.author, {$push: {posts: document._id}})
})

export const BlogPost = model('BlogPost', blogSchema);

