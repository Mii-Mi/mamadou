const { Router } = require('express'),
      router = Router()

const userMiddleware = require('../middlewares/user')

const login = require('../controllers/backend/users/login'),
      signup = require('../controllers/backend/users/signup'),
      welcome = require('../controllers/backend/users/welcome'),
      profile = require('../controllers/backend/users/profile')

router.get('/', userMiddleware.isLoggedIn, welcome)
router.post('/login', login)
router.post('/signup', userMiddleware.validateRegister, signup)
router.get('/profile', userMiddleware.isLoggedIn, profile)


module.exports = router