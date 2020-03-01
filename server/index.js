const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const cors = require('cors')
const morgan = require('morgan')
const connectDb = require('./config/db')

dotenv.config({ path: './config/config.env' })

connectDb()

const users = require('./routes/users')

const app = express()

app.use(express.json())
app.use(cors())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use('/api/v1/users', users)

const PORT = process.env.PORT || 4000

app.get('/', (req, res) => {
  res.send({msg:'hello world'})
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})