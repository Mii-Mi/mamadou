const pool = require('../../../db/index'),
      jwt = require('jsonwebtoken'),
      bcrypt = require('bcryptjs')

module.exports = (request, response, next) => {

  const getUser = {
    text: `SELECT * FROM users WHERE username = $1`,
    values: [request.body.userName]
  }

  pool.query(
    getUser,
    (err, res) => {
      // user does not exists
      if (err) { return next(err) };
      if (!res.rows.length) {
        return response.status(401).send({
          msg: 'Username or password is incorrect!'
        });
      }
      // check password
      bcrypt.compare(
        request.body.pass,
        res.rows[0]['pass'],
        (bErr, bResult) => {
          // wrong password
          if (bErr) {
            throw bErr;
            return response.status(401).send({
              msg: 'Username or password is incorrect!'
            });
          }
          if (bResult) {
            const token = jwt.sign({
                username: res.rows[0].username,
                userId: res.rows[0].id
              },
              'SECRETKEY', {
                expiresIn: '7d'
              }
            );

            const setTstamp = {
              text: `UPDATE users SET last_login = now() WHERE id = ($1)`,
              values: [res.rows[0].id]
            }  

            pool.query(
              setTstamp
            );
            return response.status(200).send({
              msg: 'Logged in!',
              token,
              user: res.rows[0]
            });
          }
          return response.status(401).send({
            msg: 'Username or password is incorrect!'
          });
        }
      );
    }
  );
}