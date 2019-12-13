const { Router } = require('express'),
      router = Router()

const userMiddleware = require('../middlewares/user')

const update = require('../controllers/backend/articles/update'),
      get = require('../controllers/frontend/articles/get')

router.get('/contact', get.contact)
router.get('/:position', get.single)
router.put('/:id', userMiddleware.isLoggedIn, update)

module.exports = router