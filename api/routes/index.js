const { Router } = require('express'),
      router = Router()
      welcome = require('./welcome'),
      admin = require('./admin'),
      articles = require('./articles'),
      messages = require('./messages')

router.use('/', welcome)
router.use('/admin', admin)
router.use('/articles', articles)
router.use('/messages', messages)

module.exports = router