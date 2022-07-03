import express, { Application } from 'express'
import morgan from 'morgan'
import router from './routes'
import * as dotenv from 'dotenv'

const app: Application = express()
const PORT = 8080

dotenv.config()

app.use(morgan('short'))
app.use('/', router)

app.listen(PORT, () => console.log(`⚡️[server]: Express running on port ${PORT}`))

export default app
