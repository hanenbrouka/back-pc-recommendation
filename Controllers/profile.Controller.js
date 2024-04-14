const userProfile = require("../Models/userProfile");
const { validationResult } = require("express-validator");



// Fonction pour vérifier si un profil existe pour l'utilisateur connecté
exports.ajoutProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Récupérer l'ID de l'utilisateur depuis le token par exemple

    // Vérifier si l'utilisateur est connecté
    if (!req.user) {
      return res.status(401).json({ message: "Utilisateur non connecté" });
    }

    // Vérifier si un profil existe pour cet utilisateur
    const existingProfile = await Profile.findOne({ user: userId });
    if (existingProfile) {
      return res.status(200).json({ message: "Profil existant pour cet utilisateur" });
    }

    // Récupérer les informations de l'utilisateur depuis la base de données
    const user = await User.findOne({ _id: userId }).select("-password");
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Créer un nouveau profil pour l'utilisateur
    const newProfile = new userProfile({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });

    await newProfile.save();
    res.status(201).json({ message: "Profil utilisateur créé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la création du profil utilisateur :", error);
    res.status(500).json({ message: "Erreur lors de la création du profil utilisateur" });
  }
};
// Méthode de contrôleur pour modifier le profil de l'utilisateur
exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Récupérer l'ID de l'utilisateur depuis le token par exemple
    const { firstName, lastName, email} = req.body;

    // Vérifier si l'utilisateur existe dans la base de données
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
  
    // Mettre à jour les données de l'utilisateur
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
  

    await user.save();
    res.status(200).json({ message: "Profil utilisateur mis à jour avec succès" });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du profil utilisateur :", error);
    res.status(500).json({ message: "Erreur lors de la mise à jour du profil utilisateur" });
  }
};




