require("dotenv").config();
const { verifyToken } = require('../Utils/generateToken');
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    // Récupérer le token du header de la requête
    const token = req.header('x-auth-token');

    // Vérifier si le token existe
    if (!token) {
      return res.status(401).json({ msg: 'Token not found or invalid! Access denied' });
    }

    // Vérifier et décoder le token
    const decryptedToken = await verifyToken(token);

    // Vérifier si le décodage a réussi
    if (!decryptedToken) {
      return res.status(401).json({ msg: 'Invalid token! Access denied' });
    }

    // Si tout est bon, ajouter l'utilisateur au corps de la requête
    req.user = decryptedToken.user;
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(400).json({ msg: 'Token verification failed! Access denied' });
  }
};
