const jwt = require('jsonwebtoken'),
      pool = require('../db/index')

module.exports = {

  validateRegister: (req, res, next) => {
    // username min length 3
    if (!req.body.userName || req.body.userName.length < 3) {
      return res.status(400).send({
        msg: 'Please enter a username with min. 3 chars'
      });
    }
    // password min 6 chars
    if (!req.body.pass || req.body.pass.length < 6) {
      return res.status(400).send({
        msg: 'Please enter a password with min. 6 chars'
      });
    }
    // password (repeat) does not match
    // if (
    //   !req.body.pass_repeat ||
    //   req.body.pass != req.body.pass_repeat
    // ) {
    //   return res.status(400).send({
    //     msg: 'Both passwords must match'
    //   });
    // }
    next();
  },

  isLoggedIn: (req, res, next) => {
    
    if (req.session.user) {
      const getUser = {
        text: `SELECT * FROM users WHERE id = $1`,
        values: [req.session.user.userId]
      }
      pool.query(
        getUser,
        (err, res) => {
          // user does not exists
          if (err) {
            return res.status(401).send({
              msg: 'Your session is not valid 1 !'
            })
          };
          if (!res.rows.length) {
            return res.status(401).send({
              msg: 'Username or password is incorrect!'
            });
          }
        }
      )
    }else {
      return res.status(401).send({
        msg: 'Your session is not valid 2 !'
      })
    }
    try {
      const token = req.headers.authorization
      const decoded = jwt.verify(
      token,
      'SECRETKEY'
      );
      req.userData = decoded;
      next();
    } catch (err) {
      return res.status(401).send({
        msg: 'Your session is not valid 3 !'
      });
    }
  }
};
