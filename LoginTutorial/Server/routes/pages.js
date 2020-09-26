
// Damit der Code übersichtlich belibt, werden hier die Verlinkungen ausgelagert
const express = require('express');

const router = express.Router();


// Seiten Anfragen und Requests
router.get('/',(req,res)=>{
    res.render('index');


});

// Route zum Registrieren der User
router.get('/register',(req,res)=>{
    res.render('register');


});

// Route zum Login von Usern

router.get('/login',(req,res)=>{
    res.render('login');


});

module.exports = router;
