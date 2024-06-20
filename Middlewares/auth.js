const jwt = require('jsonwebtoken');
const User = require('../Models/User'); // Assurez-vous d'importer votre modèle utilisateur
require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    // Récupérer le token du header de la requête
    const token = req.header('x-auth-token');
    // Vérifier si le token existe
    if (!token) {
      return res.status(401).json({ msg: 'Token not found or invalid! Access denied' });
    }
    
    // Vérifier et décoder le token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decodedToken);

    // Vérifier si le décodage a réussi
    if (!decodedToken) {
      return res.status(401).json({ msg: 'Invalid token! Access denied' });
    }
    // Recherchez l'utilisateur correspondant dans la base de données et ajoutez-le à la requête
    const user = await User.findById(decodedToken.user.id);
    if (!user) {
      return res.status(401).json({ msg: 'User not found. Access denied' });
    }
    req.user = user; // Ajoutez l'utilisateur complet ou juste l'ID à la requête
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(400).json({ msg: 'Token verification failed! Access denied' });
  }
};