//Fürs Testen ob das Java Skript aufgerufen wird
alert("Hello Javaskript");


// Anlegen des Buttons von HTML in Java Skript, bezeichnung des HTML Button wie in CSS
const button = document.querySelector("#button");
console.log(button);

// Name des Buttons über Java Skript ändern
button.innerHTML = "Do Stuff";



// Button wird geklickt, und löst etwas aus
button.addEventListener("click", ()=> {
alert("Hooray you clicked the button");
});


// Liste von HTML auf Java übertragen
const listItems = document.querySelectorAll("#meineListe li");

console.log(listItems);

const form = document.querySelector("form");

form.addEventListener("submit", (evt) =>{

evt.preventDefault();

alert("ASDASD");

});

// Prüfen der Anmeldung über Promisses 

// Deklaration
let  AnmeldeName = "Tobias";
let  AnmeldeEmail = "test@gmail.com";




// Methode zum prüfend er Anmeldung
const PrüfeUsername= () =>
new Promise((resolve, reject)=>{
    let UserName = document.querySelector("#username").value;
    if(UserName == AnmeldeName)
    {
        return resolve("Anmeldename war richtig");
    }
    else
    {
        reject("Anmeldename war falsch")
    }


});
const PrüfeUserermail= () =>
new Promise((resolve, reject)=>{

    let UserEmail = document.querySelector("#email").value;
    if(UserEmail == AnmeldeEmail)
    {
        return resolve("Anmeldeemail war richtig");
    }
    else
    {
        reject("Anmeldeemail war falsch")
    }


});

const AusgabeAnmeldung = () =>{
    console.log('Anmeldung war erfolgreich');
    alert("Anmeldung war erfolgreich");
};
const ErrorAnmeldung = (error) =>{
    console.log(error);
    alert(error);
};

// Abfragen ob die Methode ausgeführt werden soll
document.querySelector("#Anmelden").addEventListener("click",()=>{

    PrüfeUsername()
 .then(PrüfeUserermail)
 .then(AusgabeAnmeldung)
 .catch(error => ErrorAnmeldung(error));

});
