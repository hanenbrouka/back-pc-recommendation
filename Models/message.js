const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const MessageSchema = new Schema({
  subject: { type: String, required: true },
  body: { type: String, required: true },
  recipients: [{ type: String, required: true }], // Liste des e-mails des destinataires
  dateSent: { type: Date, default: Date.now }
});

module.exports = model('Message', MessageSchema);
