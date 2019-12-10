const { Router } = require('express'),
      router = Router()

const userMiddleware = require('../middlewares/user')

const login = require('../controllers/backend/users/login'),
      logout = require('../controllers/backend/users/logout')
      signup = require('../controllers/backend/users/signup'),
      titles = require('../controllers/backend/users/articles/titles'),
      articles = require('../controllers/frontend/articles/get')
      profile = require('../controllers/backend/users/profile')

router.get('/articles/titles/:position', userMiddleware.isLoggedIn, titles)
router.get('/articles/common/:position', userMiddleware.isLoggedIn, articles.single)
router.get('/articles/contact', userMiddleware.isLoggedIn, articles.contact)
router.post('/login', login)
router.delete('/logout', userMiddleware.isLoggedIn, logout)
router.post('/signup', userMiddleware.validateRegister, signup)
router.get('/profile', userMiddleware.isLoggedIn, profile)


module.exports = router