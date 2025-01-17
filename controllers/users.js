import { Router } from "express";
import { User } from "../models/blog-users.js";
import bcrypt from 'bcrypt'

const usersRouter = Router()

usersRouter.post('/users', async (req, res) => {
    const { username, name, password } = req.body

    const passwordHash = await bcrypt.hash(password, 10)

    const newUser = new User({ username, name, passwordHash })
    const savedUser = await newUser.save()
    res.status(201).json(savedUser)
})

export { usersRouter }
