const express = require("express");
const router = express.Router();
const { signup,login,updateForgotPassword,sendForgetPasswordEmail, logout, authenticatedUser } = require("../Controllers/auth.Controller");
const auth = require("../Middlewares/auth")
const {updateUser,deleteUser,getAllUsers} = require("../Controllers/User.Controller");
const { validateSignup, validateLogin } = require("../Utils/validation/userValidation");


//authController
// Route pour le signup
router.post("/signup", validateSignup ,signup);
// Route pour le login
router.post('/login',validateLogin, login);
// Route pour la réinitialisation du mot de passe
router.put('/reset-password/:token', updateForgotPassword)
// Route pour l'envoi de l'e-mail de réinitialisation de mot de passe
router.post('/forgot-password', sendForgetPasswordEmail)
// Route pour authenticated user
router.get('/', auth,authenticatedUser)
// Route pour la déconnection
// router.post("/logout", logout);

//gérer user
// Routes pour la gestion des utilisateurs par l'admin
router.put('/update-user/:userId',auth, updateUser); // Modifier un utilisateur par l'admin
router.delete('/delete-user/:userId',auth, deleteUser); // Supprimer un utilisateur par l'admin
router.get('/users',auth, getAllUsers); // Obtenir la liste de tous les utilisateurs par l'admin



module.exports = router;
