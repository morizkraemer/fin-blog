import { Router } from "express";
import { User } from "../models/blog-users.js";
import bcrypt from 'bcrypt'

const usersRouter = Router()

usersRouter.post('/users', async (req, res, next) => {
    try {
        const { username, name, password } = req.body

        if (!username || !password) res.status(404).send({error: "username or password missing"})
        const passwordHash = await bcrypt.hash(password, 10)

        const newUser = new User({ username, name, passwordHash })
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    } catch (err) {
        next(err)
    }
})

usersRouter.get('/users', async (req, res) => {
    const allUsers = await User.find({}).populate('posts')
    res.send(allUsers)
})

export { usersRouter }
