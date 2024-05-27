const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const AdminSchema = new mongoose.Schema({
  user:{ //dependance de uml (profil marbout b user mou3ayn)
    type:mongoose.Schema.Types.ObjectId, 
    ref:'User'
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});
// Hasher le mot de passe
AdminSchema.pre('save', async function (next) {
 if (!this.isModified('password')) return next()
 try {
     const salt = await bcrypt.genSalt(12)
     this.password = await bcrypt.hash(this.password, salt)
   
 } catch (error) { 
     return next (error)
 }
})

const Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin;