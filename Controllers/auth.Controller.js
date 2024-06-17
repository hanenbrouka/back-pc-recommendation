const User = require("../Models/User");
const auth = require("../Middlewares/auth");
const { validationResult } = require("express-validator");
const { generateToken } = require("../Utils/generateToken");
const { sendResetPasswordEmail } = require("../Utils/sendPasswordRecovery");
const bcrypt = require("bcryptjs");
const { sendEmailToUser } = require("../Utils/sedMailPasswordUser");
const jwt = require('jsonwebtoken');

// Méthode de contrôleur pour l'inscription
exports.signup = async (req, res) => {
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
        .json({ message: "An account with this email already exists." });
    }

    // Vérifier si les mots de passe correspondent
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Enter the same password twice for verification." });
    }

    // Créer un nouvel utilisateur
    user = new User({
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      // role:"admin"
    });

    // Sauvegarder l'utilisateur dans la base de données
    const payload = {
      user: {
        id: user.id,
        email: user.email,
      },
    };
    const token = await generateToken(payload);
    await user.save();
    await sendEmailToUser(email, password)
    return res.status(200).json({ message: "Inscription réussie", token });
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    res.status(500).json({ message: "Erreur lors de l'inscription" });
  }
};

// Méthode de contrôleur pour le login
exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errors: errors.array({ onlyFirstError: true }) });
  }
  const { email, password } = req.body;

  try {
    // Vérifier si l'utilisateur existe dans la base de données

    // const salt = await bcrypt.genSalt(12);
    // hasedPassword = await bcrypt.hash(password, salt);

    const user = await User.findOne( {email} );

    if (!user) {
      return res
        .status(404)
        .json({ message: "No account with this email has been registered." });
    }
    const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({
                errors: [{ msg: 'Cannot find user with those credentials!' }]
            })
        }
    const payload = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN }, (error, token) => {
      if (error) throw error
      res.json({ token: token, admin: user.role.name === "Admin" ? true : false })
      console.log("true");
  })
    const token = generateToken(payload);
    // Authentification réussie
    res
      .status(200)
      .json({ message: "Connexion réussie", token, user: payload });
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    res.status(500).json({ message: "Erreur lors de la connexion" });
  }
};
//get auth user
exports.authenticatedUser = async (req, res) => {
  try {
    
    // Récupérez l'utilisateur par son ID
    const user = await User.findById(req.user.id);

    // Si l'utilisateur n'est pas trouvé, renvoyez une erreur 404
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Renvoyez les informations de l'utilisateur (sans mot de passe pour la sécurité)
    res.status(200).json({ message: "Connexion réussie", user: user.toObject() });
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    res.status(500).json({ message: "Erreur lors de la connexion." });
  }
};
//forgot Password
exports.sendForgetPasswordEmail = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errors: errors.array({ onlyFirstError: true }) });
  }
  const email = req.body["email"];
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        errors: [{ msg: "Cannot find user with those credentials!" }],
      });
    }
    const payload = {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
    const token = generateToken(payload);
    sendResetPasswordEmail(req.body["email"], token);
    res.status(200).json({ msg: "Email sent!" });
  } catch (error) {
    console.error("fff", error.message);
    res.json({ msg: "Error server!" });
  }
};

//update password (forgot password)
exports.updateForgotPassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errors: errors.array({ onlyFirstError: true }) });
  }
  try {
    const verif = await verifToken(req.params.token);
    if (!verif) {
      return res.status(400).json({
        status: false,
        message: "Invalid Token !",
      });
    }
    const user = await User.findOne({ _id: verif.user.id });
    if (!user) {
      return res.status(400).json({
        status: false,
        message: "Cannot find user with those credentials!",
      });
    }

    const salt = await bcrypt.genSalt(12);
    const newpassword = await bcrypt.hash(req.body.password, salt);
    const result = await User.findByIdAndUpdate(verif.user.id, {
      $set: { password: newpassword },
    }).select("-password");
    res.send({ status: true, message: "password updated successfully" });
  } catch (error) {
    console.log(error);
  }
};

//modifier password mel user

exports.modifPassword = async (req, res) => {
  const { currentPassword, newPassword, confirmPassword, firstName, lastName ,email} = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errors: errors.array({ onlyFirstError: true }) });
  }

  try {
    // Rechercher l'utilisateur par son ID
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Vérifier si le mot de passe actuel est correct
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Vérifier si les nouveaux mots de passe correspondent
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Générer le hash du nouveau mot de passe
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Mettre à jour les informations de l'utilisateur
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        $set: {
          password: hashedPassword,
          firstName: firstName || user.firstName,
          lastName: lastName || user.lastName,
          email: email || user.email,
          // Ajoutez d'autres champs à mettre à jour ici si nécessaire
        },
      },
      { new: true } // Pour retourner le nouvel utilisateur mis à jour
    ).select('-password'); // Pour exclure le champ de mot de passe de la réponse

    res.json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Error updating user" });
  }
};
