const pool = require('../../../db/index')

module.exports = (req, res, next) => {
  req.session.destroy()
  res.status(200).send({
    msg: 'Vous êtes maintenant déconnecté !'
  })

}