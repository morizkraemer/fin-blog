import { Blog } from '../models/Blog.js'
import express from "express"

const PostsRouter = express.Router()

PostsRouter.get('/blogs', async (req, res) => {
    const blogs = await Blog.find({})
    res.json(blogs)
})

PostsRouter.post('/blogs', async (req, res, next) => {
    const newBlogEntry = new Blog(req.body)
    try {
        const blogEntry = await newBlogEntry.save()
        res.status(201).json(blogEntry)
    } catch (err) {
        next(err)
    }
})

PostsRouter.delete('/blogs/:id', async (req, res, next) => {
        try {
        await Blog.deleteOne({_id: req.params.id})
        res.status(204).send('deleted')
    } catch (err) {
        next(err)
    }

})

export { PostsRouter }
