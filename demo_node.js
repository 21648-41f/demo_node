const express = require("express");

const app = express();
let maReponse = "";

app.get("/", (req, res, next)=>{
    maReponse = "Allo";
    next();
})
app.get("/", (req, res)=>{
    maReponse += " le monde"
    res.send(maReponse);
})
app.get("/produit", (req, res)=>{
    res.send("les produits");
})

app.get("/produit/:id_biere", (req, res)=>{
    console.log(req);
    res.send("Mon produit : " +req.params.id_biere);
})

/*app.route("/produit")
    .get((req, res)=>{

    })
    .post((req, res)=>{
        
    })
    .put((req, res)=>{
        
    })*/

app.listen(8080, ()=>{
    console.log("démarré");
});

