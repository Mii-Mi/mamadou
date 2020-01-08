const pool = require ('../../../db/index'),
      nodemailer = require('nodemailer'),
      config = require('../../../config/mailer_config')

module.exports = (req, res, next) => {
  if (!req.body.userName || !req.body.email || !req.body.content) {
    return res.status(400).send({msg: 'Tous les champs sont requis !'})
  }

  // SAVE DATAS
  const addMsg = {
    text: `INSERT INTO messages(authorfirst, authorlast, authormail, content, created) VALUES ($1, $2, $3, $4, $5)`,
    values: [req.body.userFirstName, req.body.userName, req.body.email, req.body.content, new Date()]
  }

  pool.query(
    addMsg,
    (err, result) => {
      if (err) {
        res.status(400).send({
          msg: 'Une erreur s\'est produite'
        });
        throw err;
      }
      // THEN => MAILER
      async function myCustomMethod(ctx){
        let cmd = await ctx.sendCommand(
            'AUTH PLAIN ' +
                Buffer.from(
                    '\u0000' + ctx.auth.credentials.user + '\u0000' + ctx.auth.credentials.pass,
                    'utf-8'
                ).toString('base64')
        );

        if(cmd.status < 200 || cmd.status >=300){
            throw new Error('Failed to authenticate user: ' + cmd.text);
        }
      }
      let transporter = nodemailer.createTransport({
          host: "resistance.cf",
          port: 25,
          secure: false, // true for 465, false for other ports
          auth: {
              type: 'custom',
              method: 'MY-CUSTOM-METHOD',
              user: config.usr1,
              pass: config.pass1
          },
          customAuth: {
              'MY-CUSTOM-METHOD': myCustomMethod
          }
      });

      let mailOptions = {
          from: '"Mii-Mi" <miimi@resistance.cf>', // sender address
          to: 'peigne.cecile@gmail.com', // list of receivers
          subject: "Mamadou: nouveau message !", // Subject line
          text: `Bonjour !\n
          Nouveau message de ${req.body.userFirstName} ${req.body.userName} reçu sur le site "lab.cecile.cf".\n
          contenu :\n
          ${req.body.content}\n
          Adresse mail du contact :\n
          ${req.body.email}`, // plain text body
          html: `<h1>Bonjour !</h1>
          <p>Nouveau message de ${req.body.userFirstName} ${req.body.userName} reçu sur le site "lab.cecile.cf".</p>
          <h2>contenu :</h2>
          <p>${req.body.content}</p>
          <h3>Adresse mail du contact</h3>
          <p><a href="mailto:${req.body.email}">${req.body.email}</a></p>`// html body
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) { 
          res.status(400).send({
            msg: 'Une erreur s\'est produite'
          });
          return next(error)
         }
        return res.status(201).send({msg: 'Message envoyé !'})
      })
    }
  )
}