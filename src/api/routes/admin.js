const { Router } = require('express'),
  router = Router(),
  pool = require('../db/index')

router.post('/login', (request, response, next) => {
  
  const {body} = request.body

  pool.query('SELECT * FROM users WHERE userName = $1 AND pass = $2', [body.userName, body.pass], (err, res) => {
    if (err) return next(err)
    response.send('ok')
})

})

module.exports = router