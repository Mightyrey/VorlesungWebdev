// SQl importieren
const mysql = require("mysql");

// die installierten Frameworks einbinden um diese zu benutzen
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Hier wird die verbindung zur db hergestellt, falls diese nicht lokal ist einfach bei host die IP-adresse eintragen
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database: process.env.database
});



// Nimmt die Daten der Webseite entgegen
exports.register = (req, res) =>{
    console.log(req.body);
    
    // Daten aus Body in Vairable übertragen
    // const name= req.body.name;
    //const email = req.body.email;
    //const password= req.body.password;
    //const passwordConfirm = req.body.passwordConfirm;
    // Hier einfacher :-) das ist nur erlaubt, wenn der name und die id auch so im Frontend passen
    const {name, email, password, passwordConfirm} = req.body;

    // Abfrage der Datenbank 
   db.query('SELECT email FROM users WHERE email = ?', [email], async (error,results)=>{
   
    // Bei Fehler Fall eine Error Meldung ausgeben
    if(error)
    {
        console.log(error);
    }
    // Prüfen ob das array mit der E-Mail größer als 0 ist, da dann dieses schon in der Datenbank vorhanden ist und ausgegen wird
    if(results.length > 0)
    {
        return res.render('register', {
            message: 'That email is already in use'
        })
    }
    else if(password !== passwordConfirm)
    {
        return res.render('register', {
            message: 'Passwords do not match'
        })
    }

    let hasedPassword = await bcrypt.hash(password, 8);
    console.log(hasedPassword);



   }); // db query

        
}