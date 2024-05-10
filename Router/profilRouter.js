const express = require("express");
const auth = require("../Middlewares/auth")
const { ajoutProfile, updateProfile } = require("../Controllers/profile.Controller");
const router = express.Router();


// Route pour la réinitialisation du mot de passe
router.post('/profil',auth ,ajoutProfile )






module.exports = router;