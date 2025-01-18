import mongoose from 'mongoose'
import logging from './logging.js'
import env from './env-config.js'
import { createTestDB } from './mongo-test-con.js'
const { connect, connection } = mongoose
const user = env.MONGO_USER
const pw = env.MONGO_PW
const mode = env.MODE

logging.info(`app in ${mode} mode`)
let mongoUrl
switch (mode) {
    case 'test':
        mongoUrl = await createTestDB()
        break
    default:
        if (!user || !pw) {
            throw new Error('pw or user missing, check env variables')
        }
        mongoUrl =
            `mongodb+srv://${user}:${pw}@blogdb.0228l.mongodb.net/productionDB?retryWrites=true&w=majority&appName=blogdb`
        break
}

if (mongoUrl) {
    await connect(mongoUrl, { autoIndex: true })
    try { logging.info(`${connection.name} connected`) }
    catch (err) { logging.error(err) }
}


export default mongoose
