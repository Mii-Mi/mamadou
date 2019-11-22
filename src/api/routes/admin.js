const { Router } = require('express'),
  router = Router()

const login = require('../controllers/backend/users/login')

router.post('/login', login)

module.exports = router