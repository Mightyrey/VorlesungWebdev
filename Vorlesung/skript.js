alert("Hello Javaskript");
const button = document.querySelector("#button");
console.log(button);
button.unnerHTML = "Do Stuff";

button.addEventListener("click", ()=> {
alert("Hooray you clicked the button");





});


const listItems = document.querySelectorAll("#meineListe li");

console.log(listItems);

const form = document.querySelector("form");

form.addEventListener("submit", (evt) =>{

evt.preventDefault();

alert("ASDASD");



})


