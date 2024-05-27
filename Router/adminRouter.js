const express = require('express');
const router = express.Router();
const auth = require("../Middlewares/auth")
const {addAdmin, DeleteAdmin} = require("../Controllers/Admin.Controller");



// Routes pour les admins
router.post('/add-admin', addAdmin);
router.delete('/delete-admin/:id',DeleteAdmin);

module.exports = router;