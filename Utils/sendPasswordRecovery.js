const nodemailer = require('nodemailer');

const send = (x = "", sendto, subjects, htmls) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "envast@gmail.com",
      pass: Mailer_Password = "sxuqodqvepdjxpyl" 
    }
  });
  let mailOptions = {
    from: "hanenbrouka25@gmail.com",
    to: sendto,
    subject: subjects,
    html: `<p><b>Cher(e) membre</b>,</p>
      <p> Nous avons reçu une demande de réinitialisation de mot de passe pour votre compte. Veuillez utiliser le lien ci-dessous pour accéder à la page de réinitialisation : </p>
      <p>Lien de récupération : <a href="http://localhost:5000/reset-password/${htmls}"> http://localhost:4200/reset-password/${htmls}</a> </p>
      <p>Si vous n'avez pas demandé de réinitialisation de mot de passe, veuillez ignorer cet e-mail. Votre compte est sécurisé.</p>
      <p>Si vous rencontrez des difficultés lors de la réinitialisation de votre mot de passe ou si vous avez des questions, n'hésitez pas à nous contacter. Nous sommes là pour vous aider.</p>
      <p> Cordialement,</p>
      <p><strong>Envast</strong></p>
      <img src="https://www.tragedel.com/_next/image?url=%2FtragedelBlack.png&w=256&q=75" alt="Logo de l'entreprise" width="256" height="75">`
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent:' + info.response);
    }
  });
}
module.exports = { send: send }
