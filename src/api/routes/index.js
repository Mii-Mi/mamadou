const { Router } = require('express'),
      router = Router(),
      welcome = require('./welcome'),
      admin = require('./admin')

router.use('*', (req, res, next) => {
  console.log(req.session.userId)
  next()
})

router.use('/', welcome)
router.use('/admin', admin)


module.exports = router