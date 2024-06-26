const nodemailer = require("nodemailer")

const sendMailNewsletter = async (email, token) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "hotmail",
      port:587,
      secure: false, // true for 465, false for other ports

      auth: {
        user: "envastenvast@hotmail.com",
        pass: "azerty123",
      },
      tls: {
        rejectUnauthorized: false
    }
    });

    // Define email content
    const mailOptions = {
      from: " envastenvast@hotmail.com  ",
      to: email,
      subject: "enregistrer a newsletter",
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
              <h1>PC RECOMMENDATION</h1>
            </div>
            <div class="content">
              <p>Hello,</p>
              <p>You've requested to reset your password for PC RECOMMENDATION. Please click the button below to reset your password.</p>
              <a href="http://localhost:3000/reset-password/${token}" class="button">Reset Password</a>
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
    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send reset email");
  }
};




module.exports = { sendMailNewsletter}
