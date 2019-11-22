const pool = require('../../../db/index')

module.exports = (request, response, next) => {
  
  const {body} = request.body

  pool.query(`
  SELECT * FROM users WHERE userName = $1 AND pass = $2`, [body.userName, body.pass], (err, res) => {
    if (err) return next(err)
    response.json(res.rows)
})

}