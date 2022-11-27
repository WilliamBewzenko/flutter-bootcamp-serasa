const express = require('express')

// const database = require('./database')

const app = express()

const PORT = process.env.PORT || 8080

app.listen(PORT, async () => {
    console.log(`Server is running in port ${PORT}`)
})
