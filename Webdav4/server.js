const express = require("express")

const app = express();

app.use(express.static("public"));

const todos =[{
    id:1,
    title:"Datenbank Anbindung",
}
,
];
app.get("/todos", (req,res)=>{
    res.json(todos)
});



app.listen(5555);