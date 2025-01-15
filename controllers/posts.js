import {Blog} from '../models/Blog.js'
import express from "express"

const PostsRouter = express.Router()

PostsRouter.get('/blogs', (req, res) => {
    Blog
        .find({})
        .then(blogs => {
            res.json(blogs)
        })
})

PostsRouter.post('/blogs', (req, res) => {
    const newBlogEntry = new Blog(req.body)
    newBlogEntry
        .save()
        .then(result => {
            res.status(201).json(result)
        })
})


export { PostsRouter }
