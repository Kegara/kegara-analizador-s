//imports
const express = require('express');
const router = express.Router();
//middleware
//routes
router.get('/',(req,res)=>{
    res.render('index.html',{title:'Ejemplo analizador'});
});

router.get('/Ejemplos',(req,res)=>{
    res.render('Ejemplos.html',{title:'Ejemplos'});
});
router.get('/servicios/ajaxanalizador.js',(req,res)=>{
    //llamado a la clase sentiment
    var Sentiment = require("sentiment");
    //reseñas
    var comentarios = [
    "There are two responses I get, without fail, every time I try to get someone new to watch this show. 'I don't like the art style' or 'I've seen the dub - NO THANKS.' I'm guilty of both of these myself. But if there's one thing I need to stress before even getting started on this review, it's that the 4Kids dub is NOT One Piece. For the love of god, PLEASE do not think it is. If you've suffered the misfortune of seeing some of the 4Kids episodes, just erase them from your mind and start fresh. They butchered it, there's really no other way to put it. They cut episodes, changed the dialogue to fit a MUCH younger and apparently far less intelligent audience (almost insultingly so), gave the characters RIDICULOUS voices, and pretty much watered down the entire series. FUNimation has done a much better job so far from what I've seen, but regardless, watching it in its original Japanese form with subtitles is really the way to go.",
    "One Piece is by far the best shounen anime out there that I have watched. But not all share the same views as I do, lets remedy that, shall we? A long time ago, there live a fearsome pirate king who goes by the name of Gold D. Roger. He was able to attain everything. But alas he was captured and sentenced to execution. In the brink of death, he proclaimed that he left the great treasure, One Piece, somewhere in the Grand Line and it is for anyone to claim. This event ignited the Great Pirate Age.",
    "Warning: Minor Spoilers  If I were to say anything bad (and I will have to do that as this review is not a positive one) about this anime that would not offend the hardcore fans (and I know there are a lot) is that it's PAINFULLY slow. Even if you leave the fillers aside, still- the plot itself progresses in such a slow pace that it's rather hard to watch. Now for a younger audience it may not matter that much, but to me as a higher age audience, it matters greatly, after all, out of the 23~ minutes of each episode 3 are spent ",
    "My family and I stayed at Best Western Sandcastle, and we absolutely loved it. The rooms were very clean, with an amazing view of the ocean. We will most certainly be back at this hotel very soon.",
  ];
    var sentiment = new Sentiment();
    //creamos un array donde se almacenaran los json que regresaremos
    let  ejemplores=[];
    var i=1;
    
    //iteracion de array de reseñas
    comentarios.forEach((element) => {
           //creamos una variable y le asignamos la funcion que analiza la reseña 
        let comentarioAnalizado=sentiment.analyze(element);
        //guardamos el resultado de la funcion en el array de los json
        ejemplores.push(comentarioAnalizado);
    });
    //regresamos la respuesta con formato json
    res.json(ejemplores);
});

router.get('/servicios/ajaxanalizador2.js',(req,res)=>{
    //hacemos una condicion para que solo funcione cuando se pasa por parametro get "reseña"
    if(req.query.reseña!=undefined){
        //llamado a la clase sentiment
        var Sentiment = require("sentiment");
        var sentiment = new Sentiment();
        //analizamos el parametro que nos entregaron
        let comentarioAnalizado=sentiment.analyze(req.query.reseña);
        //regresamos la respuesta con formato json
        res.json(comentarioAnalizado);

    }else{
        res.json("error");
    }

});

router.get('/Analizador',(req,res,next)=>{
    res.render('Analizador.html',{title:'Herramienta analizadora '});
});
//exports

module.exports= router;