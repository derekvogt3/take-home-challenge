import app from './app'
import mongoose from 'mongoose'

// Import Routes

import eventsRoute from './src/routes/events'
import citiesRoute from './src/routes/cities'
import bodyParser from 'body-parser'

const server_port = Number(process.env.PORT) || 4000
const server_host = process.env.YOUR_HOST || '127.0.0.1'

//DB Connection
const uri = process.env.MONGO_DB_URI!

mongoose
  .connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
  .then()
  .catch(err => {
    console.log(err)
  })

mongoose.connection.once('open', async () => {
  console.log('Connected to Mongo')
  console.log(process.env.MONGO_IP)
  console.log('Agenda initialized')
})

//Middleware

app.use(bodyParser.json())
app.use('/events', eventsRoute)
app.use('/cities', citiesRoute)

app.listen(server_port, server_host, () => {
  console.log('Running Server')
})
