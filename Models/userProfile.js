const mongoose = require("mongoose"); //importation mongoose

const userProfileSchema = new mongoose.Schema(
  {
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

const userProfile = mongoose.model("User", userProfileSchema);
module.exports = userProfile;
