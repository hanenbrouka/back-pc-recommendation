const express = require('express');
const router = express.Router();
const {
  getAllPCs,
  addPC,
  updatePC,
  deletePC
} = require('../Controllers/Articles.controller');
const { getPCsByPriceRange } = require('../Controllers/Search.controller');

// Routes pour les PCs
router.get('/laptops', getAllPCs);
router.put('/laptops/:id', updatePC);
router.delete('/laptops/:id', deletePC);
router.get('/laptops/dependonprice', getPCsByPriceRange);

module.exports = router;
