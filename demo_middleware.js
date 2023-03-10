const express = require("express");
const cors = require("cors");
const auth = require("basic-auth");

const app = express();
let bieres = [
    {nom:"Toto 1", brasserie : "Brasserie de Toto"},
    {nom:"Toto 2", brasserie : "Brasserie de Toto"}
];

function authBasic(req, res, next){
    const usager = auth(req);
    if(usager && usager.name === 'biero' && usager.pass ==='biero'){
        next();
    }
    else{
        res.status(401).send("401");
    }
}
app.use(cors());    // Middleware qui autorise le CORS (cross-origin)

app.put("*", authBasic);
app.delete("*", authBasic);
app.post("*", authBasic);
app.put("*", (req, res)=>{
    res.json(bieres);
})

app.get("/", (req, res)=> {
    res.send("<a href='http://127.0.0.1:8080/biere'>Lien</a>");
})
app.get("/biere", (req, res)=>{
    res.json(bieres)
})

app.get("/biere/:id", (req, res)=>{
    const id = req.params.id;
    if(id>bieres.length){
        res.json({});    
    }
    else{
        res.json(bieres[id]);
    }
})

app.listen(8080, ()=>{
    console.log("démarré");
});