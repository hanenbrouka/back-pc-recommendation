const auth = require("../Middlewares/auth");
const { validationResult } = require("express-validator");
const { generateToken } = require("../Utils/generateToken");
const Admin = require('../Models/admin');
const nodemailer = require("nodemailer")
const bcrypt = require('bcryptjs');

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
    // Configurer le transporteur SMTP pour nodemailer
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'votre_email@gmail.com',
        pass: 'votre_mot_de_passe'
      }
    });

    // Options pour l'email
    const mailOptions = {
      from: 'envastenvast@hotmail.com',
      to: email,
      subject: 'Nouveau compte administrateur créé',
      text: `Votre compte administrateur a été créé avec succès. Email: ${email}, Mot de passe: ${password}`
    };

    // Envoyer l'email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email envoyé: ' + info.response);
      }
    });

    res.status(201).json({ msg: 'Admin ajouté avec succès' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }
};

// Fonction pour supprimer un admin par son ID
exports.DeleteAdmin = async (req, res) => {
  const adminId = req.params.userId;
  try {
    // Vérifier si l'admin existe
    let admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ msg: 'Admin non trouvé' });
    }

    // Supprimer l'admin de la base de données
    await Admin.findByIdAndDelete(adminId);

    res.json({ msg: 'Admin supprimé avec succès' });
  } catch (err) {
    console.error(err.message);
    res
    .status(500)
    .json({ message: "Erreur lors de la suppression de l'admin" });
  }
};

