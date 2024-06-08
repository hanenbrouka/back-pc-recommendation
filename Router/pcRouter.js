const express = require('express');
const router = express.Router();
const {
  getAllPCs,
  addPC,
  updatePC,
  deletePC
} = require('../Controllers/Articles.controller');

// Routes pour les PCs
router.get('/pcs', getAllPCs);
router.put('/pcs/:id', updatePC);
router.delete('/pcs/:id', deletePC);

module.exports = router;
