const pool = require('../../../db/index')

module.exports = (req, res, next) => {
  if (req.session.user) {
    return res.status(200).send({
      username: req.session.user.username
    });
  }
}