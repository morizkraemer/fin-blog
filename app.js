import express, { json } from 'express'
import cors from 'cors'
import { errorHandler, unknownEndpoint } from './utils/error-handling.js'
import { PostsRouter } from './controllers/posts.js'
import { TestRouter } from './controllers/test-routes.js'
import mongoose from './utils/mongo-con.js'

const app = express()

app.use(cors())
app.use(json())

app.use('/api', PostsRouter)
app.use('/test', TestRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

export default app
