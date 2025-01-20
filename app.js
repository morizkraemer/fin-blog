import express, { json } from 'express'
import cors from 'cors'
import { errorHandler, unknownEndpoint } from './utils/error-handling.js'
import { postsRouter } from './controllers/posts.js'
import { testRouter } from './controllers/test-routes.js'
import { usersRouter } from './controllers/users.js'
import mongoose from './utils/mongo-con.js'
import morgan from 'morgan'
import { loginRouter } from './controllers/login.js'
import { getToken } from './utils/user-helpers.js'

const app = express()

app.use(cors())
app.use(json())
app.use(morgan('tiny'))
app.use(getToken)

app.use('/api', postsRouter)
app.use('/api', usersRouter)
app.use('/api', loginRouter)
app.use('/test', testRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

export default app
