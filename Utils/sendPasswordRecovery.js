const nodemailer = require("nodemailer")

const sendResetPasswordEmail = async (email, token) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "hotmail",
      auth: {
        user: "envastenvast@hotmail.com",
        pass: "azerty123",
      },
    });

    // Define email content
    const mailOptions = {
      from: " envastenvast@hotmail.com  ",
      to: email,
      subject: "Password Recovery",
      html: `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Password Reset</title>
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
              background-color: #007bff;
              color: #fff;
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
              background-color: #007bff;
              color: #fff !important;
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
              <h1>ENVAST</h1>
            </div>
            <div class="content">
              <p>Hello,</p>
              <p>You've requested to reset your password for ENVAST. Please click the button below to reset your password.</p>
              <a href="http://localhost:3000/reset-password/${token}" class="button">Reset Password</a>
            </div>
            <div class="footer">
              <p>If you didn't request this, you can safely ignore this email.</p>
              <p>&copy; 2023 ENVAST. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  };
    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send reset email");
  }
};


module.exports = {  sendResetPasswordEmail   }

// const nodemailer = require('nodemailer');

// const send = ( sendto,subjects= "test", token) => {
//   let transporter = nodemailer.createTransport({
//     service: 'hotmail',
//     auth: {
//       user: "envastenvast@hotmail.com",
//       pass: Mailer_Password = "azerty123" 
//     }
//   });
//   let mailOptions = {
//     from: "envastenvast@hotmail.com",
//     to: sendto,
//     subject: subjects,
//     html: `<p><b>Cher(e) membre</b>,</p>
//       <p> Nous avons reçu une demande de réinitialisation de mot de passe pour votre compte. Veuillez utiliser le lien ci-dessous pour accéder à la page de réinitialisation : </p>
//       <p>Lien de récupération : <a href="http://localhost:3000/reset-password/${token}"> http://localhost:3000/reset-password/${token}</a> </p>
//       <p>Si vous n'avez pas demandé de réinitialisation de mot de passe, veuillez ignorer cet e-mail. Votre compte est sécurisé.</p>
//       <p>Si vous rencontrez des difficultés lors de la réinitialisation de votre mot de passe ou si vous avez des questions, n'hésitez pas à nous contacter. Nous sommes là pour vous aider.</p>
//       <p> Cordialement,</p>
//       <p><strong>Envast</strong></p>
//       <img src="logo" alt="Logo de l'entreprise" width="256" height="75">`
//   };

//   transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log('Email sent:' + info.response);
//     }
//   });
// }
// module.exports = { sendMail: send }
