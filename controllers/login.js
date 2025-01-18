import Router from 'express'
import { User } from '../models/blog-users.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import env from '../utils/env-config.js'

const loginRouter = Router()


loginRouter.post('/login', async (req, res, next) => {
    let passwordCorrect = false
    const { username, password } = req.body
    const dbUser = await User.findOne({ username })
    if (dbUser) passwordCorrect = await bcrypt.compare(password, dbUser.passwordHash)
    if (!passwordCorrect) return res.status(401).send({ error: 'username or password incorrect' })

    const user = {
        username: dbUser.username,
        id: dbUser._id
    }
    const token = jwt.sign(user, env.JWT_SECRET)
    res.send({token, ...user})
})

export { loginRouter }
