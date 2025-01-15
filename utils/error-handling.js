import logging from "./logging.js"

export const unknownEndpoint = (req, res) => {
    return response.status(404).send({error: 'unknown endpoint'})
}

export const errorHandler = (err, req, res, next) => {
    logging.error(err)

    if (err.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id provided' })
    }
    next(err)
}
