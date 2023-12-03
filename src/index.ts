import 'dotenv/config'
import { env } from '~/env.mjs'
import app from '~/app'

const port = env.PORT || 3000

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

process.on('SIGINT', () => {
  process.exit()
})
