const User = require("../Models/User");
const UserProfile = require("../Models/userProfile");
const { validationResult } = require("express-validator");

// consulter la liste de tous les utilisateurs (pour l'admin)
exports.getAllUsers = async (req, res) => {
  try { 
    const userProfiles = await UserProfile.find();
    res.status(200).json(User);
    if (UserProfile.length < 1) {
      res.status(404).json({ msg: "Aucun utilisateur trouvé" });
    } else {
      res.status(200).json(userProfiles);
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs :", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des utilisateurs" });
  }
};

// modifier un utilisateur (par l'admin)
exports.updateUser = async (req, res) => {
  const userId = req.params.userId;
  const { firstName, lastName, email } = req.body; 
  const profilData ={}
  if ( firstName) profilData.firstName=firstName
  if ( lastName) profilData.firstName=lastName
  if ( email) profilData.firstName=email
  try {
    let userProfile = await UserProfile.findOne({ user: userId });
    let user = await  User.findById(userId).select("-password");
    if ( !user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    if ( user?.role === "admin"){
      return res.status(403).json({ message: "action interdite" });
    }

    
    // Mise à jour des données de l'utilisateur
    userProfile = await UserProfile.findOneAndUpdate(
      { user: userId },
      { $set: profilData },
      { new: true }
    );
    user = await User.findOneAndUpdate(
      { _id: userId },
      { $set: profilData },
      { new: true }
    );
    await userProfile?.save();
    await user?.save();

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

    await User.findOneAndDelete({ _id: userId });
    await UserProfile.findOneAndDelete({ user: userId });
    res.status(200).json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur :", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression de l'utilisateur" });
  }
};
