const { Router } = require('express'),
  router = Router(),
  pool = require('../db/index')

  router.get('/', (request, response, next) => {

    pool.query('SELECT * FROM monsters ORDER BY id ASC', (err, res) => {
        if (err) return next(err)
        response.json(res.rows)
    })

})

module.exports = router