import express from "express"

const testRouter = express.Router()

testRouter.get('/', (req, res) => {
    res.send('test success')
})

export { testRouter }
