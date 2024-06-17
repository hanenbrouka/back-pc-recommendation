const express = require("express");
const auth = require("../Middlewares/auth");
const {
  inscritNewsletter,sendAdminNotification,getAllEmailNews,getAllMessageNews
} = require("../Controllers/Newslettre.controller");
const router = express.Router();

// Route pour la réinitialisation du mot de passe
router.post("/inscrit_newsletter",inscritNewsletter);
router.post('/admin/send-notifications', sendAdminNotification);
router.get('/admin/getAllMailNews', getAllEmailNews);
router.get('/admin/getAllMessageNews', getAllMessageNews);


module.exports = router;
