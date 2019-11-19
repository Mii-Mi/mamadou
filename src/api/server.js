const express = require('express'),
      app = express(),
      routes = require('./routes'),
      bodyparser = require('body-parser'),
      cors = require('cors')

app.use(cors())

app.use(bodyparser.json())

app.use(routes)

app.use((err, req, res, next) => {
  res.json(err)
})

module.exports = app