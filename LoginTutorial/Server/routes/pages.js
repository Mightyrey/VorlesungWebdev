
// Damit der Code übersichtlich belibt, werden hier die Verlinkungen ausgelagert
const express = require('express');

const router = express.Router();


// Seiten Anfragen und Requests
router.get('/',(req,res)=>{
    res.render('index');


});


router.get('/register',(req,res)=>{
    res.render('register');


});

module.exports = router;
