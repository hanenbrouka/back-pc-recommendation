const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

const NewsletterSchema = new mongoose.Schema({
  email: String ,
 
});

module.exports = mongoose.model('newsletter', NewsletterSchema);
