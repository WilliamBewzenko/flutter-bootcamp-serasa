const express = require('express')

const database = require('./database')
const todoApi = require('./api/todo')

const app = express()

app.use(express.json())
app.use('/api/todo', todoApi)

const PORT = process.env.PORT || 8080
app.listen(PORT, async () => {
  await database.sync()

  console.log(`Server is running in port ${PORT}`)
})
