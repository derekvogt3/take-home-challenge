import express from 'express'
require('dotenv').config()

import cors from 'cors'
const app = express()
app.use(cors())

export default app
