import { BlogPost } from '../models/blog-post.js'
import express from "express"
import { User } from '../models/blog-users.js'
import jwt from 'jsonwebtoken'
import env from '../utils/env-config.js'

const postsRouter = express.Router()

postsRouter.get('/blogs', async (req, res) => {
    const blogs = await BlogPost.find({}).populate('author', { username: 1, posts: 1})
    res.json(blogs)
})

postsRouter.post('/blogs', async (req, res, next) => {
    const request = req.body
    const decodedToken = jwt.decode(req.token, env.JWT_SECRET)
    if (!decodedToken.id) {
        return res.status(400).send({error: 'invalid token'})
    }
    const user = await User.findById(decodedToken.id)
    const newBlogEntry = new BlogPost({...request, author: user._id})
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
