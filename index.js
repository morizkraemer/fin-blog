import app from './app.js'
import env from './utils/env-config.js'

const PORT = env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
