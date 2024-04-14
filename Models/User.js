const mongoose = require("mongoose"); //importation mongoose
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    
    },
    lastName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:[true, 'Please Enter an Email'],
        unique: true 
    },
    password:{
        type:String,
        required:true,
        
    },
    confirmPassword:{
        type:String,
        required:true,
    },
    role:{
        type: String,
        enum: ['admin', 'user', 'superAdmin'], // Liste des rôles autorisés
        default: 'user' // Rôle par défaut
    }
  
} , { timestamps: true })
// Hasher le mot de passe
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    try {
        const salt = await bcrypt.genSalt(12)
        this.password = await bcrypt.hash(this.password, salt)
    } catch (error) {
        return next(error)
    }
})


const User = mongoose.model('User', userSchema);
module.exports = User; 
