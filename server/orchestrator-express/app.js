const express = require('express')
const app = express()
const port = 4000 || process.env.PORT
const router = require('./routes')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(router)
  
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})