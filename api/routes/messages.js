const { Router } = require('express'),
      router = Router()

const add = require('../controllers/frontend/messages/msgAdd')

router.post('/add', add)

module.exports = router