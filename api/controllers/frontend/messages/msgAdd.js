const pool = require ('../../../db/index'),
      nodemailer = require('nodemailer'),
      config = require('../../../config/mailer_config')

module.exports = (req, res, next) => {
  if (!req.body.userName || !req.body.email || !req.body.content) {
    console.log(req.body)
    console.log('pas bien :(')
    return res.status(400).send({msg: 'Tous les champs sont requis !'})
  }

  // MAILER
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
      from: '"miimi" <miimi@resistance.cf>', // sender address
      to: 'peigne.cecile@gmail.com', // list of receivers
      subject: "Mamadou: nouveau message !", // Subject line
      text: `Bonjour !\n
      Nouveau message de ${req.body.userName} reçu sur le site "lab.cecile.cf".\n
      contenu :\n
      ${req.body.content}`, // plain text body
      html: `<h1>Bonjour !</h1>
      <p>Nouveau message de ${req.body.userName} reçu sur le site "lab.cecile.cf".</p>
      <h2>contenu :</h2>
      <p>${req.body.content}</p>`// html body
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) { return next(error) }
    console.log(info)
    return res.status(200).send({msg: 'Email envoyé !'})
  })
}