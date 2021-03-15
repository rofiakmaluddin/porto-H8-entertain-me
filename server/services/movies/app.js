const express = require('express')
const { connect } = require('./config/mongodb')
const app = express()
const port = 4001 || process.env.PORT
const router = require('./routes')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(router)
  
connect().then(async(db) => {
  console.log("mongodb is running");
  
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
})