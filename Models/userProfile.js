const mongoose = require("mongoose"); //importation mongoose
const { Schema, model } = require('mongoose')

const UserProfileSchema = new mongoose.Schema(
  {
    user:{ //dependance de uml (profil marbout b user mou3ayn)
      type:mongoose.Schema.Types.ObjectId, 
      ref:'User'
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Please Enter an Email"],
      unique: true,
    },

    role: {
      type: String,
      enum: ["admin", "user", "superAdmin"], // Liste des rôles autorisés
      default: "user", // Rôle par défaut
    },
  },
  { timestamps: true }
);

const UserProfile = mongoose.model("UserProfile", UserProfileSchema);
module.exports = UserProfile;
