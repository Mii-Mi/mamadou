const { Router } = require('express'),
      router = Router(),
      welcome = require('./welcome')

router.use('/', welcome)

module.exports = router