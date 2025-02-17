import logging from "./logging.js"

export const unknownEndpoint = (req, res) => {
    return res.status(404).send({ error: 'unknown endpoint' })
}

export const errorHandler = (err, req, res, next) => {
    logging.error(err)
    switch (err.name) {
        case 'ReferenceError':
        case 'CastError':
            return res.status(400).send({ error: 'malformatted id provided' })
        case 'ValidationError':
            return res.status(400).send({ error: 'db validation error' })
        case 'MongoServerError':
            switch (err.code) {
                case 11000:
                    return res.status(400).send({ error: 'duplicate key error' })
            }
        default:
            return res.status(500).send({ error: 'internal server error' })
    }
}
