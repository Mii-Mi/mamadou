const { Router } = require('express'),
      router = Router()

const welcome = require('../controllers/frontend/welcome')

router.get('/', welcome)

module.exports = router