const User = require("../Models/User");
const auth = require("../Middlewares/auth");
const { validationResult } = require("express-validator");
const { generateToken } = require("../Utils/generateToken");


exports.addAdmin = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  try {
     // Vérifier si l'utilisateur est un super admin (dans un vrai système, cela serait plus sécurisé)
     const IsSuperAdmin = req.headers.authorization === 'SuperAdminToken';

     if (!isAdmin) {
       return res.status(403).json({ message: 'Access denied. Only super admin can add an admin.' });
     }
 
      // Check if the user already exists
      let user = await User.findOne({ email });

      if (user) {
          return res.status(400).json({ message: 'User already exists' });
      }

      // Create a new user object
      user = new User({
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
          role: 'admin' // Set the role to 'admin'
      });

      // Save the user to the database
      await user.save();

      res.status(201).json({ message: 'Admin created successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
  }
};


//get auth admin
exports.authenticatedUser= async (req, res) => {
  try {
   const user = await user.findOne({_id:req.user.id})
   if(user.role==='admin'){
     return res
     .status(404)
     .json({ message: "un admin ne peut pas gérer un autre admin." });
   }
   res.status(200).json({ message: "Connexion réussie",user });
  } catch (error) {
   console.error("Erreur lors de la connexion :", error);
   res.status(500).json({ message: "Erreur lors de la connexion" });
 }
 }

// modifier un admin (par super admin)
exports.updateAdmin = async (req, res) => {
 const userId = req.params.userId;
 const newData = {};

 try {
  
   let user = await  User.findById(userId).select("-password");
   if (!user) {
     return res.status(404).json({ message: "User not found " });
   }
   if ((user.toString()!== user._id.toString())|| user.role !== "superAdmin"){
     return res.status(403).json({ message: "action interdite" });
   }

   
   // Mise à jour des données de l'admin
  
   user = await User.findOneAndUpdate(
     { _id: userId },
     { $set: newData },
     { new: true }
   ); 
  
   await user.save();

   res.status(200).json({ message: " User updated successfully" });
 } catch (error) {
   console.error("Error updating admin:", error);
   res
     .status(500)
     .json({ message: "Error updating admin" });
 }
};

// supprimer un utilisateur (par l'admin)
exports.deleteAdmin = async (req, res) => {
 const userId = req.params.userId;

 try {
   const user = await User.findById(userId);
   if (!user) {
     return res.status(404).json({ message: "admin not found" });
   }
   if ((user.toString()!== user._id.toString())|| user.role !== "superAdmin"){
    return res.status(403).json({ message: "action interdite" });
  }

   await user.findOneAndDelete({ _id: userId });
   res.status(200).json({ message: "Admin deleted successfuly" });
 } catch (error) {
   console.error("Error deleted admin :", error);
   res
     .status(500)
     .json({ message: "Erro deleted admin" });
 }
};


