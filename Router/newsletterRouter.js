const express = require("express");
const auth = require("../Middlewares/auth");
const {
  inscritNewsletter,
} = require("../Controllers/Newslettre.controller");
const router = express.Router();

// Route pour la réinitialisation du mot de passe
router.post("/inscrit_newsletter",inscritNewsletter);

module.exports = router;
