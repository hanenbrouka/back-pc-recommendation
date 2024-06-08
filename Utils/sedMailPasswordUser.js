const nodemailer = require('nodemailer');

// Fonction pour envoyer l'e-mail à l'utilisateur
const sendEmailToUser = async (email, password) => {

  try {
    // Configuration du transporteur de messagerie
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      port:587,
      secure: false, // true for 465, false for other ports

      auth: {
        user: 'tragedela@gmail.com', // Remplacez par votre adresse e-mail
        pass: 'sxuqodqvepdjxpyl' // Remplacez par votre mot de passe
      },
      tls: {
        rejectUnauthorized: false
    }
    });
    // Définir les informations de l'e-mail
    const mailOptions = {
      from: 'hanenbrouka25@gmail.com', // Remplacez par votre adresse e-mail
      to: email, // Adresse e-mail de l'utilisateur
      subject: 'Détails de connexion',
      html: `<h1>Bienvenue en tant qu'Admin</h1>
      <p>Vous avez été ajouté en tant qu'administrateur sur notre plateforme.</p>
      <p>Voici vos informations de connexion :</p>
      <ul>
        <li><strong>Email :</strong> ${email}</li>
        <li><strong>Mot de passe :</strong> ${password}</li>
      </ul>
      <p>Pour vous connecter, veuillez visiter le lien suivant :</p>
      <p><a href="https://www.example.com/login">Se connecter</a></p>
      <p>Pour votre sécurité, il est recommandé de changer votre mot de passe après la première connexion.</p>
      <p>Merci de faire partie de notre équipe !</p>`
    };

    // Envoyer l'e-mail
    const info = await transporter.sendMail(mailOptions);
    console.log('E-mail envoyé :', info.response);
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
  }
}

module.exports = { sendEmailToUser: sendEmailToUser }
