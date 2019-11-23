const { Router } = require('express'),
      router = Router()
      welcome = require('./welcome'),
      admin = require('./admin')

router.use('/', welcome)
router.use('/admin', admin)


module.exports = router