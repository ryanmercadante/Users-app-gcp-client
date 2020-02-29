const express = require('express')
const cors = require('cors')

const corsConfig = {
  origin: 'https://mernongae.appspot.com/'
}
const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())

app.get('/', (req, res) => {
  res.send({msg:'hello world'})
})

app.get('/api/users', (req, res) => {
  const fakeUsers = [
    { name: 'Ryan', age: 24 },
    { name: 'Kyle', age: 22 },
    { name: 'John', age: 25 },
    { name: 'Joe', age: 30 },
  ]
  res.send(fakeUsers)
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})