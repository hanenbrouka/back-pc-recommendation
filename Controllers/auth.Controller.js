const User = require("../Models/User");
const { validationResult } = require("express-validator");


// Méthode de contrôleur pour l'inscription
exports.signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errors: errors.array({ onlyFirstError: true }) });
  }
  const { firstName, lastName, email, password, confirmPassword } = req.body; 
  console.log({ req });
  try {
// Vérifier si l'utilisateur existe déjà 
    let user = await User.findOne({ email });

    if (user) {
      //true or false
      return res.status(400).json({ message:"An account with this email already exists." });
    }

    // Vérifier si les mots de passe correspondent
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Enter the same password twice for verification."});
    }


    // Créer un nouvel utilisateur 
    user = new User({
      firstName,
      lastName,
      email,
      password
    });

    // Sauvegarder l'utilisateur dans la base de données
    await user.save();

    res.status(200).json({ message: "Inscription réussie" }); 
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
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "No account with this email has been registered." });
    }

  

    // Authentification réussie
    res.status(200).json({ message: 'Connexion réussie' });
  } catch (error) {
    console.error('Erreur lors de la connexion :', error);
    res.status(500).json({ message: 'Erreur lors de la connexion' });
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
  const email = req.body['email']
  try {
      const user = await User.findOne({ email: email })
      if (!user) {
          return res.status(400).json({
              errors: [{ msg: 'Cannot find user with those credentials!' }]
          })
      }
      const payload = {
          user: {
              id: user.id
          }
      }
      const token = generateToken(payload)
      mailer.send("resetCode", req.body['email'], "reset your password", token);
      res.status(200).json({ msg: 'Email sent!' })
  } catch (error) {
      console.error('fff', error.message)
      res.json({ msg: 'Error server!' })
  }
 }

 //update password (forgot password)
 exports.updateForgotPassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errors: errors.array({ onlyFirstError: true }) });
  }
  try {
      const verif = await verifToken(req.params.token)
      if (!verif) {
          return res.status(400).json({
              status: false, message: 'Invalid Token !'
          })
      }
      const user = await User.findOne({ _id: verif.user.id })
      if (!user) {
          return res.status(400).json({
              status: false, message: 'Cannot find user with those credentials!'
          })
      }
      const salt = await bcrypt.genSalt(12)
      const newpassword = await bcrypt.hash(req.body.password, salt)
      const result = await User.findByIdAndUpdate(verif.user.id, { $set: { password: newpassword } })
          .select('-password')
      res.send({ status: true, message: 'password updated successfully' })
  } catch (error) {
      console.log(error)
  }
}
// Méthode de contrôleur pour mettre à jour les données de l'utilisateur
// exports.updateUser = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res
//       .status(400)
//       .json({ errors: errors.array({ onlyFirstError: true }) });
//   }
//   try {
//     const { userId, newData } = req.body;

//     // Vérifier si l'utilisateur existe dans la base de données
//     const user = await User.findById(Id);
//     if (!user) {
//       return res.status(404).json({ message: "Utilisateur non trouvé" });
//     }

//     // Mettre à jour les données de l'utilisateur
//     const isUpdated = await user.updateUserData(newData);
//     if (isUpdated) {
//       return res.status(200).json({ message: "Données utilisateur mises à jour avec succès" });
//     } else {
//       return res.status(500).json({ message: "Erreur lors de la mise à jour des données utilisateur" });
//     }
//   } catch (error) {
//     console.error("Erreur lors de la mise à jour des données utilisateur :", error);
//     console.log("Erreur lors de la mise à jour des données utilisateur :", error);
//     res.status(500).json({ message: "Erreur lors de la mise à jour des données utilisateur" });
//   }
// };

    //  déconnecter l'utilisateur 
exports.logout = async (req, res) => {
  try {

    // Par exemple, si vous utilisez JWT, vous pouvez simplement effacer le cookie JWT
    res.clearCookie("jwtToken"); // Assurez-vous que le nom du cookie correspond à celui que vous utilisez

    res.status(200).json({ message: "Déconnexion réussie" });
  } catch (error) {
    console.error("Erreur lors de la déconnexion :", error);
    res.status(500).json({ message: "Erreur lors de la déconnexion" });
  }
};