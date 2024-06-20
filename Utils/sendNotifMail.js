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
      from: "tragedela@gmail.com",
      to: "hanenbrouka25@gmail.com",
      subject: " Bienvenue à notre newsletter ",
      html: `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title> Newsletter </title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 20px auto;
              padding: 20px;
              background-color: #fff;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0,0,0,0.1);
            }
            .header {
              background: #ffe6a6;
              color: #3c413f !important;
              padding: 15px;
              text-align: center;
              border-top-left-radius: 8px;
              border-top-right-radius: 8px;
            }
            .header h1 {
              margin: 0;
              font-size: 24px;
            }
            .content {
              padding: 20px 0;
            }
            .content p {
              margin: 0;
              color: #333;
            }
            .button {
              display: inline-block;
              background: #ffe6a6;
              color: #3c413f !important;
              text-decoration: none;
              padding: 10px 20px;
              border-radius: 5px;
              margin-top: 20px;
            }
            .footer {
              margin-top: 20px;
              text-align: center;
              color: #777;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Newsletter</h1>
            </div>
            <div class="content">
              <p>Bienvenue,</p>
              <p>

Merci de vous être inscrit à notre newsletter ! Nous sommes ravis de vous compter parmi nos abonnés.</p>
              
            </div>
            <div class="footer">
              <p>If you didn't request this, you can safely ignore this email.</p>
              <p>&copy; 2024 ENVAST. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `,
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
