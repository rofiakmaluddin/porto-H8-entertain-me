const express = require('express')
const { connect } = require('./config/mongodb')
const app = express()
const port = process.env.PORT || 4002
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