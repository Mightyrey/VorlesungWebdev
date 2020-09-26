// SQl importieren
const mysql = require("mysql");

// die installierten Frameworks einbinden um diese zu benutzen
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { query } = require("express");

// Hier wird die verbindung zur db hergestellt, falls diese nicht lokal ist einfach bei host die IP-adresse eintragen
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database: process.env.database
});


//  Funktion zum Einloggen

exports.login = async(req,res) => {
   
    try {
        // Abfrage E-mail und Password aus dem Formular
        const{email, password} = req.body;

        if(!email || !password)
        {
            return res.status(400).render('login',{
                message:'Please provide an email an password'
            })
        }


    db.query('SELECT * From users WHERE email = ?', [email], async(error, results) =>{
    console.log(results);
    if(!results || !(await bcrypt.compare(password, results[0].password)))
    {
        res.status(401).render('login', {
            message:'Email or Password is incorrect'
        })
    }
    else{
        const id = results[0].id;
        const token = jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });

        console.log("the token is:" +token);
        const cookieOptions = {
            expires: new Date(
                Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
            ), 
            httpOnly: true
        }

        res.cookie('jwt', token, cookieOptions);
        res.status(200).redirect("/");

    }



    });



    } catch (error) {
        console.log(error);
    }

}

//


// Funktion zum Registrien von Usern
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

    // passord hashen
    let hasedPassword = await bcrypt.hash(password, 8);
    console.log(hasedPassword);
    // Test ob das hashen des Passworts funktioniert
    //res.send("testing");
    // Die anmelde Daten an die Datenbank übergeben
    db.query('INSERT INTO users SET ? ', {name: name, email: email, password: hasedPassword }, (error, results)=>{
       // Prüfen ob die Datenübertragung in die Datenbank funktioniet hat
        if(error){
            console.log(error);
        }
        else{
            console.log(results);
            return res.render('register', {
                message: 'User registered'
            });
        }
    })

   }); // db query


   // Funktion zum Prüfen ob der Cookie noch aktuell ist um die Seite zu erreichen
   
}