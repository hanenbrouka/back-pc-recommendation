const nodemailer = require('nodemailer');
const Message = require('../Models/message');

async function sendBulkMail(emails, subject, body, batchSize = 10, delay = 1000) {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Ou autre service SMTP
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'tragedela@gmail.com',
      pass: 'sxuqodqvepdjxpyl'
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  for (let i = 0; i < emails.length; i += batchSize) {
    const batch = emails.slice(i, i + batchSize);

    const mailOptions = {
      from: 'tragedela@gmail.com',
      to: batch.join(','), // Envoyer à tous les utilisateurs de ce lot
      subject: subject,
      text: body
    };

    try {
      // Envoyer le lot d'e-mails
      await transporter.sendMail(mailOptions);
      console.log(`Emails envoyés au lot : ${batch.join(', ')}`);
    } catch (error) {
      console.error('Erreur lors de l\'envoi des e-mails :', error);
    }

    // Attendre avant d'envoyer le prochain lot
    if (i + batchSize < emails.length) {
      console.log(`Attente de ${delay}ms avant d'envoyer le prochain lot...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  // Enregistrer le message envoyé dans la base de données
  const message = new Message({
    subject,
    body,
    recipients: emails
  });

  await message.save();
  console.log('Notification enregistrée dans la base de données.');
}

module.exports = { sendBulkMail };
