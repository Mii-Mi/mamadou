const express = require('express'),
      app = express(),
      session = require('express-session'),
      pg = require('pg')
      pgPool = require('./db/index'),
      pgSession = require('connect-pg-simple')(session),
      routes = require('./routes'),
      bodyparser = require('body-parser'),
      cors = require('cors'),
      corsConfig = require('./config/cors_config'),
      history = require('connect-history-api-fallback'),
      fileUpload = require('express-fileupload')

app.use(cors({
  origin: corsConfig.origin,
  credentials: true
}))

app.use(bodyparser.json({limit: '500mb'}))
app.use(bodyparser.urlencoded({extended: true, limit: '500mb'}))

app.use(session({
  store: new pgSession({
    pool : pgPool,
  }),
  secret: 'mama cook',
  name: 'logged_in',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: false,
    maxAge: 365 * 24 * 60 * 60 * 1000
  }
}))

app.use(fileUpload())

app.use(history({index: '/index.html'}))
app.use(routes)

app.use(express.static('public'))

app.use((err, req, res, next) => {
  console.log(err)
  return res.status(400).send({
    msg: 'Une erreur s\'est produite'
  });
})

module.exports = app