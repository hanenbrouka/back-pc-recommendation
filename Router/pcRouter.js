const express = require('express');
const router = express.Router();
const {
  getAllPCs,
  addPC,
  updatePC,
  deletePC
} = require('../Controllers/Articles.controller');

// Routes pour les PCs
router.get('/laptops', getAllPCs);
router.put('/laptops/:id', updatePC);
router.delete('/laptops/:id', deletePC);

module.exports = router;
