const express = require("express"); // Zum starten des SQL servers

// ist einde Defult funktion
const path = require('path');

// SQl importieren
const mysql = require("mysql");

//(HTML anpassungen)
const dotenv = require('dotenv');

// Hier wird das File mit den Sensiblen Informationen eingefügt, so sind diese über das Javascript nicht sichtbar
dotenv.config({path:'./.env'});

const app = express(); // zum server starten über dsa app skript

// Hier wird die verbindung zur db hergestellt, falls diese nicht lokal ist einfach bei host die IP-adresse eintragen
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database: process.env.database
});

// Hier kommt das Frontend rein/ __dirname gibt dir zugriff auf die aktuelle Direktory bei uns dann eins hoch springen!
const publicDirectory = path.join(__dirname, './public');
// gibt das akutlle direktory zurück
//console.log(__dirname);

// hier wird die zuvor erzeuge Direktory benutzt, siehe oben const publicDirectory
app.use(express.static(publicDirectory));


//Parse URL-encoded bodies (as sent by html from), nimmt die von HTML gesendeten Sachen entgegen
app.use(express.urlencoded({extended:false}));
// Sorg dafür das die Daten die kommen im Format JSON übertragen werden
app.use(express.json());




// Starten der HTMl Engine
app.set('view engine', 'hbs')





//zur Datenbank verbidnen
db.connect((error)=>{
    if(error)
    {
        console.log(error);
    }
    else
    {
        console.log("MYSQL connected...");
    }
});

// Define Routes
// Aufruf des Routen Skripts mit den Seiten
app.use('/', require('./routes/pages'));
// jedes mal wenn wir /auth aufrufen läuft es in routs --> auth rein
app.use('/auth', require('./routes/auth'));


// Auf diesen Port hört der express Server! Wichtig 
app.listen(5000,() =>{
    console.log("Server started on Port 5000")


}) ;
