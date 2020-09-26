
// Damit der Code übersichtlich belibt, werden hier die Verlinkungen ausgelagert
const express = require('express');

// .. um einen Ordner höher zu gehen, hier wird einController inizialisiert
const authController = require('../controllers/auth');

const router = express.Router();


// wird nur aufgerufen wenn ein Post benutzt wird
router.post('/register', authController.register)

router.post('/login', authController.login);

module.exports = router;
