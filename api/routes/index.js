const { Router } = require('express'),
      router = Router()
      welcome = require('./welcome'),
      admin = require('./admin'),
      articles = require('./articles')

router.use('/', welcome)
router.use('/admin', admin)
router.use('/articles', articles)

module.exports = router