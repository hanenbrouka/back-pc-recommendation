const express = require("express");
const router = express.Router();
const { signup,login,updateForgotPassword,sendForgetPasswordEmail, logout } = require("../Controllers/auth.Controller");
const {updateUserProfile} = require("../Controllers/profile.Controller");
const {updateUser,deleteUser,getAllUsers} = require("../Controllers/User.Controller");


//authController
// Route pour le signup
router.post("/signup", signup);
// Route pour le login
router.post('/login', login);
// Route pour la réinitialisation du mot de passe
router.put('/reset-password/:token', updateForgotPassword)
// Route pour l'envoi de l'e-mail de réinitialisation de mot de passe
router.post('/forgot-password', sendForgetPasswordEmail)
// Route pour la déconnection
router.post("/logout", logout);

//updateUserProfil

// Route pour la modification du profil utilisateur
router.put("/update-profile/:userId", updateUserProfile);

//gérer user
// Routes pour la gestion des utilisateurs par l'admin
router.put('/update-user/:userId', updateUser); // Modifier un utilisateur par l'admin
router.delete('/delete-user/:userId', deleteUser); // Supprimer un utilisateur par l'admin
router.get('/users', getAllUsers); // Obtenir la liste de tous les utilisateurs par l'admin



module.exports = router;
