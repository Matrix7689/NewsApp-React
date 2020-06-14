const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.sendFile('C:/hw8/hw8/src/App.js'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
