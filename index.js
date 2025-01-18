import app from './app.js'
import env from './utils/env-config.js'

const PORT = env.PORT
app.listen(PORT, () => {
  logging.info(`Server running on port ${PORT}`)
})
