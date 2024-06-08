const nodemailer = require('nodemailer');

// Configurer le transporteur
let transporter = nodemailer.createTransport({
  host: 'smtp.example.com',
  port: 587,
  secure: false,
  auth: {
    user: 'votre-email@example.com',
    pass: 'votre-mot-de-passe'
  }
});

// Contenu de la newsletter
let mailOptions = {
  from: '"Nom de l\'expéditeur" <votre-email@example.com>',
  to: 'destinataire@example.com', // Liste des destinataires
  subject: 'Votre newsletter de mai',
  html: `
    <h1>Bienvenue dans notre newsletter de mai</h1>
    <p>Voici les dernières nouvelles de notre entreprise...</p>
    <p>Merci de nous suivre !</p>
  `
};

// Envoyer l'email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log(error);
  }
  console.log('Email envoyé : %s', info.messageId);
});
