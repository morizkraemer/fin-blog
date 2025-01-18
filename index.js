import app from './app.js'
import env from './utils/env-config.js'
import logging from './utils/logging.js'

const PORT = env.PORT
app.listen(PORT, () => {
  logging.info(`Server running on port ${PORT}`)
})
