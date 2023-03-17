const express = require("express");
const cors = require("cors");
const auth = require("basic-auth");
const bodyParser = require("body-parser");

const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;
const app = express();

const client = new MongoClient("mongodb://127.0.0.1:27017");

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
app.use(bodyParser.json());    // Middleware qui gère les données envoyées

app.put("*", authBasic);
app.delete("*", authBasic);
app.post("*", authBasic);

app.put("/biere", (req, res)=>{
    const db = client.db("madb");
    const collection = db.collection("produit");
    let data = req.body;
    collection.insertOne(data).then(reponse=>
        res.json(reponse)
    )
    
})

app.get("/", (req, res)=> {
    res.send("<a href='http://127.0.0.1:8080/biere'>Lien</a>");
})
app.get("/biere", (req, res)=>{
    const db = client.db("madb");
    const collection = db.collection("produit");
    console.log(collection);
    const curseur = collection.find().toArray().then(data=>{
          res.json(data);
    });
    //res.json(curseur);
    
    //res.send("allo");
})

app.get("biere/:id/commentaire", (req, res)=> {
    // Quel devrait être le format des documents de commentaire? 
    // Des nouveaux documents ou bien des sous-documents?
    // ... mieux vaut faire des sous-documents

})

app.get("/biere/:id", (req, res)=>{
    const id = req.params.id;
    const db = client.db("madb");
    const collection = db.collection("produit");
    //console.log(collection);
    const _cle = new mongo.ObjectId(id);
    const curseur = collection.findOne({_id: _cle}).then(data=>{
          res.json(data);
    });
})

app.listen(8080, ()=>{
    console.log("démarré");
});