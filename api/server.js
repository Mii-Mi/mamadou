const express = require('express'),
      app = express(),
      session = require('express-session'),
      pg = require('pg')
      pgPool = require('./db/index'),
      pgSession = require('connect-pg-simple')(session),
      routes = require('./routes'),
      bodyparser = require('body-parser'),
      cors = require('cors')

app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true
}))

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: false}))

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

app.use(routes)


app.use((err, req, res, next) => {
  console.log(err)
})

module.exports = app