const { Router } = require('express'),
      router = Router()

const userMiddleware = require('../middlewares/user')

const login = require('../controllers/backend/users/login'),
      signup = require('../controllers/backend/users/signup'),
      welcome = require('../controllers/backend/users/welcome')

router.get('/', welcome)
router.post('/login', login)
router.post('/signup', userMiddleware.validateRegister, signup)


module.exports = router