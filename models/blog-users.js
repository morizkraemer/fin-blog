import { Schema, SchemaTypes, model } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: String,
    passwordHash: {
        type: String,
        required: true
    },
    posts: [
        {
            type: SchemaTypes.ObjectId,
            ref: 'BlogPost'
        }
    ]


})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject._id = returnedObject._id.toString()
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})


export const User = model('User', userSchema)
