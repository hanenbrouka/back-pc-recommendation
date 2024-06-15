const express = require("express");
const auth = require("../Middlewares/auth");
const {
  inscritNewsletter,sendAdminNotification
} = require("../Controllers/Newslettre.controller");
const router = express.Router();

// Route pour la réinitialisation du mot de passe
router.post("/inscrit_newsletter",inscritNewsletter);
router.post('/admin/send-notifications', sendAdminNotification);


module.exports = router;
