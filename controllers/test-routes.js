import express from "express"

const TestRouter = express.Router()

TestRouter.get('/', (req, res) => {
    res.send('test success')
})

export { TestRouter }
