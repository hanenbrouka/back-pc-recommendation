const auth = require("../Middlewares/auth");
const { validationResult } = require("express-validator");
const { generateToken } = require("../Utils/generateToken");
const Admin = require('../Models/admin');
const nodemailer = require("nodemailer")
const bcrypt = require('bcryptjs');
const { sendEmailToUser } = require("../Utils/sedMailPasswordUser");

// Fonction pour ajouter un admin
exports.addAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
  
    // Vérifier si l'admin existe déjà
    let admin = await Admin.findOne({ email });
    if (admin) {
      return res.status(400).json({ msg: 'Cet admin existe déjà' });
    }

    // Créer un nouvel objet admin
    admin = new Admin({
      email,
      password
    });
    // Sauvegarder l'admin dans la base de données
    await admin.save();
    await sendEmailToUser(email, password)


    res.status(201).json({ msg: 'Admin ajouté avec succès' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }
};

// Fonction pour supprimer un admin par son ID
exports.DeleteAdmin = async (req, res) => {
  try {
      const user = await Admin.findByIdAndDelete(req.params.id);
      if (!user) {
          return res.status(404).json({ message: 'User non trouvé' });
      }
      res.status(200).json({ message: 'User supprimé avec succès' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors de la suppression du rôle' });
    }
}

