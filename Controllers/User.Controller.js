const User = require("../Models/User");
const userProfile = require("../Models/userProfile");
const { validationResult } = require("express-validator");



// consulter la liste de tous les utilisateurs (pour l'admin)
exports.getAllUsers = async (req, res) => {
  try {
    const profiles = await Profile.find(); 
    res.status(200).json(users);
    if (profile.length < 1) {
      res.status(404).json({ msg: "Aucun utilisateur trouvé" });
     
    } else {
       res.status(200).json(profiles);
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs :", error);
    res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs" });
  }
};


// modifier un utilisateur (par l'admin)
exports.updateUser = async (req, res) => {
  const userId = req.params.userId;
  const newData = req.body;

  try {
    let profile = await Profile.findOne({user:userId});
    let user = new User.findById(userId)
    if (!profile || !user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Mise à jour des données de l'utilisateur
    profile = await Profile.findOneAndUpdate({ user: userId }, { $set: newData }, { new: true })
    user = await User.findOneAndUpdate({ _id: userId }, { $set: newData }, { new: true })
    await profile.save();  


    res.status(200).json({ message: "Utilisateur mis à jour avec succès" });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
    res.status(500).json({ message: "Erreur lors de la mise à jour de l'utilisateur" });
  }
};

// supprimer un utilisateur (par l'admin)
exports.deleteUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);
    const profile = await Profile.findOne({user:userId});
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    await user.deleteOne({_id:userId});
    await profile.deleteOne({user:userId});
    res.status(200).json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur :", error);
    res.status(500).json({ message: "Erreur lors de la suppression de l'utilisateur" });
  }
};
