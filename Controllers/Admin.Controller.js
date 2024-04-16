const User = require("../Models/User");
const auth = require("../Middlewares/auth");
const { validationResult } = require("express-validator");
const { generateToken } = require("../Utils/generateToken");



// Méthode de contrôleur pour l'inscription d'admin
exports.signupAdmin = async (req, res) => {
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
   return res
     .status(400)
     .json({ errors: errors.array({ onlyFirstError: true }) });
 }
 const { firstName, lastName, email, password, confirmPassword } = req.body;
 // console.log({ req });
 try {
   // Vérifier si l'utilisateur existe déjà
   let user = await User.findOne({ email });

   if (user) {
     //true or false
     return res
       .status(400)
       .json({ message: "An admin with this email already exists." });
   }

   // Vérifier si les mots de passe correspondent
   if (password !== confirmPassword) {
     return res
       .status(400)
       .json({ message: "Enter the same password twice for verification." });
   }

   // Créer un nouvel admin
   user = new User({
     firstName,
     lastName,
     email,
     password,
     confirmPassword,
     role:"admin"
   });

   // Sauvegarder l'admin dans la base de données
   await user.save();
   const payload = {
     user: {
       id: user.id,
       email: user.email,
     },
   };
   const token = await generateToken(payload);

   res.status(200).json({ message: "Inscription réussie", token });
 } catch (error) {
   console.error("Erreur lors de l'inscription :", error);
   res.status(500).json({ message: "Erreur lors de l'inscription" });
 }
};

// modifier un utilisateur (par l'admin)
exports.updateAdmin = async (req, res) => {
 const userId = req.params.userId;
 const newData = req.body;

 try {
   let userProfile = await UserProfile.findOne({ user: userId });
   let user = await  User.findById(userId).select("-password");
   if (!userProfile || !user) {
     return res.status(404).json({ message: "Utilisateur non trouvé" });
   }
   if ((userProfile.user.toString()!== user._id.toString())|| user.role !== "superAdmin"){
     return res.status(403).json({ message: "action interdite" });
   }

   
   // Mise à jour des données de l'utilisateur
   userProfile = await UserProfile.findOneAndUpdate(
     { user: userId },
     { $set: newData },
     { new: true }
   );
   user = await User.findOneAndUpdate(
     { _id: userId },
     { $set: newData },
     { new: true }
   );
   await userProfile.save();
   await user.save();

   res.status(200).json({ message: "Utilisateur mis à jour avec succès" });
 } catch (error) {
   console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
   res
     .status(500)
     .json({ message: "Erreur lors de la mise à jour de l'utilisateur" });
 }
};

// supprimer un utilisateur (par l'admin)
exports.deleteUser = async (req, res) => {
 const userId = req.params.userId;

 try {
   const user = await User.findById(userId);
   const userProfile = await UserProfile.findOne({ user: userId });
   if (!user) {
     return res.status(404).json({ message: "Utilisateur non trouvé" });
   }

   await user.findOneAndDelete({ _id: userId });
   await userProfile.findOneAndDelete({ user: userId });
   res.status(200).json({ message: "Utilisateur supprimé avec succès" });
 } catch (error) {
   console.error("Erreur lors de la suppression de l'utilisateur :", error);
   res
     .status(500)
     .json({ message: "Erreur lors de la suppression de l'utilisateur" });
 }
};
