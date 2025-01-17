import { BlogPost } from '../models/blog-post.js'
import express from "express"

const postsRouter = express.Router()

postsRouter.get('/blogs', async (req, res) => {
    const blogs = await BlogPost.find({})
    res.json(blogs)
})

postsRouter.post('/blogs', async (req, res, next) => {
    const newBlogEntry = new BlogPost(req.body)
    try {
        const blogEntry = await newBlogEntry.save()
        res.status(201).json(blogEntry)
    } catch (err) {
        next(err)
    }
})

postsRouter.delete('/blogs/:id', async (req, res, next) => {
    try {
        await BlogPost.deleteOne({ _id: req.params.id })
        return res.status(204).send('deleted')
    } catch (err) {
        next(err)
    }

})

postsRouter.put('/blogs/:id', async (req, res, next) => {
    try {
        const response = await BlogPost.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        )
        res.status(200).json(response)
    } catch (err){
        next(err)
    }
})

export { postsRouter }
