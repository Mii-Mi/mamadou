const pool = require('../../../db/index'),
      jwt = require('jsonwebtoken'),
      bcrypt = require('bcryptjs')

module.exports = (req, res, next) => {
  const {username, pass} = req.body

  const getUser = {
    text: `SELECT * FROM users WHERE username = $1;`,
    values: [username]
  }

  pool.query(
    getUser,
    (err, result) => {
      // user does not exists
      if (err) {
        throw err;
        return res.status(400).send({
          msg: err
        });
      }
      if (!result.length) {
        return res.status(401).send({
          msg: 'Username is incorrect!'
        });
      }
      // check password
      bcrypt.compare(
        pass,
        result[0]['pass'],
        (bErr, bResult) => {
          // wrong password
          if (bErr) {
            throw bErr;
            return res.status(401).send({
              msg: 'password is incorrect!'
            });
          }
          if (bResult) {
            const token = jwt.sign({
                username: result[0].username,
                userId: result[0].id
              },
              'SECRETKEY', {
                expiresIn: '7d'
              }
            );

            const setTstamp = {
              text: `UPDATE users SET last_login = now() WHERE id = ($1)`,
              values: [result[0].id]
            }  

            pool.query(
              setTstamp
            );
            return res.status(200).send({
              msg: 'Logged in!',
              token,
              user: result[0]
            });
          }
          return res.status(401).send({
            msg: 'Username or password is incorrect!'
          });
        }
      );
    }
  );
}