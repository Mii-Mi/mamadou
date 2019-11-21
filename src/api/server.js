const express = require('express'),
      app = express(),
      routes = require('./routes'),
      bodyparser = require('body-parser'),
      cors = require('cors')

app.use(cors())

app.use(bodyparser.json())

app.use(routes)

app.use((err, req, res, next) => {
  console.log(err)
})

module.exports = app