import logging from "./logging.js"

export const unknownEndpoint = (req, res) => {
    return response.status(404).send({ error: 'unknown endpoint' })
}

export const errorHandler = (err, req, res, next) => {
    logging.error(err)
    switch (err.name) {
        case 'CastError':
            return res.status(400).send({ error: 'malformatted id provided' })
        case 'ValidationError':
            return res.status(400).send({ error: 'db validation error' })
        default:
            return res.status(500).send({error: 'internal server error'})
    }
}
