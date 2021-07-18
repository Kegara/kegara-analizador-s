

var contador;
inicializar();
$("#btn").click(function () {
  $.ajax({
    url: "../servicios/ajaxanalizador.js",
    method:"GET",
    data:{action:1},
    dataType:"JSON",
    success: function (data) {
      //obtenemos el conenedor donde se almacenan las reseñas
      var mainContainer = document.getElementById("contenedor-ejemplo");
      mainContainer.innerHTML = "";
      
      //reseñas 
      var comentarios = [
        "There are two responses I get, without fail, every time I try to get someone new to watch this show. 'I don't like the art style' or 'I've seen the dub - NO THANKS.' I'm guilty of both of these myself. But if there's one thing I need to stress before even getting started on this review, it's that the 4Kids dub is NOT One Piece. For the love of god, PLEASE do not think it is. If you've suffered the misfortune of seeing some of the 4Kids episodes, just erase them from your mind and start fresh. They butchered it, there's really no other way to put it. They cut episodes, changed the dialogue to fit a MUCH younger and apparently far less intelligent audience (almost insultingly so), gave the characters RIDICULOUS voices, and pretty much watered down the entire series. FUNimation has done a much better job so far from what I've seen, but regardless, watching it in its original Japanese form with subtitles is really the way to go.",
        "One Piece is by far the best shounen anime out there that I have watched. But not all share the same views as I do, lets remedy that, shall we? A long time ago, there live a fearsome pirate king who goes by the name of Gold D. Roger. He was able to attain everything. But alas he was captured and sentenced to execution. In the brink of death, he proclaimed that he left the great treasure, One Piece, somewhere in the Grand Line and it is for anyone to claim. This event ignited the Great Pirate Age.",
        "Warning: Minor Spoilers  If I were to say anything bad (and I will have to do that as this review is not a positive one) about this anime that would not offend the hardcore fans (and I know there are a lot) is that it's PAINFULLY slow. Even if you leave the fillers aside, still- the plot itself progresses in such a slow pace that it's rather hard to watch. Now for a younger audience it may not matter that much, but to me as a higher age audience, it matters greatly, after all, out of the 23~ minutes of each episode 3 are spent ",
        "My family and I stayed at Best Western Sandcastle, and we absolutely loved it. The rooms were very clean, with an amazing view of the ocean. We will most certainly be back at this hotel very soon.",
      ];

      //iteracion de json obtenido a partir de la peticion
        for (var i = 0; i < data.length; i++) {
          console.log(data);
          //creacion de elementos donde se almacenaran las respuestas
          var contenido = document.createElement("div");
          var titulo = document.createElement("div");
          var h4 =  document.createElement("h4");
          var ppositivo = document.createElement("p");
          var pnegativo = document.createElement("p");
          var pneutral = document.createElement("p");
          var punclassified = document.createElement("p");
          var calculation = document.createElement("p");
          var score = document.createElement("p");
          var chart = document.createElement("canvas");
          chart.setAttribute("id", "idchart");
          //llenado de titulo
          h4.className='my-4 callout callout-info ';
          h4.innerHTML = "Reseña "+(i+1);
          //agregamos el titulo al contenedor main
          mainContainer.appendChild(titulo);
          //agregamos el texto del titulo 
          titulo.appendChild(h4);
          titulo.innerHTML+="<p><strong>Reseña :</strong> "+comentarios[i]+"</p>";
          //empezamos a rellenar los elementos con la data recibida del json
          try {
          ppositivo.innerHTML='Positivos['+data[i].positive.length+']: ' +data[i].positive;
          } catch (error) {
            ppositivo.innerHTML='Positivos[0]: ';
          }
          try {
            pnegativo.innerHTML='Negativos['+data[i].negative.length+']: ' +data[i].negative;
          } catch (error) {
            pnegativo.innerHTML='Negativos[0]: ';
          }
          try {
            pneutral.innerHTML='Neutrales['+data[i].neutral.length+']: ' +data[i].neutral;
          } catch (error) {
            pneutral.innerHTML='Neutrales[0]: ' ;
          }
          try {
            punclassified.innerHTML='Indefinidos['+data[i].unclassified.length+']: ' +data[i].unclassified;
          } catch (error) {
            punclassified.innerHTML='Indefinidos[0]: ';
          }
          try {
            score.innerHTML='Calificación : ' +data[i].score;
          } catch (error) {
           
            score.innerHTML='Calificación : indefinida';
          }
          
          try {
            let string1 = "";
            let string2 = "";

              data[i].calculation.forEach(item => {
              const object1 = item;

              for (let property1 in object1) {
                string1 += " "+property1+" : "+object1[property1];
              }
              Object.values(object1).forEach(item => {
                string2 += item
              });
              calculation.innerHTML='Ponderación : '
              +string1;
            }
             
              
              );
           
          } catch (error) {
            console.log(error);
            calculation.innerHTML='Ponderación: error ';
          }
          
          //agregamos la clase text-break para que los textos sean responsivos
          contenido.className = "text-break";

          pneutral.className  = "text-break";
         punclassified.className  = "text-break";
          
          pnegativo.className  = "text-break";
          
          ppositivo.className  = "text-break";

          //agregamos las respuestas al contenedo del contenido
          contenido.appendChild(ppositivo);
          contenido.appendChild(pnegativo);
          contenido.appendChild(pneutral);
          contenido.appendChild(punclassified);
          contenido.appendChild(score);
          contenido.appendChild(calculation);
          contenido.appendChild(chart);
          //agregamos el contenedo del contenido al contenedor main
          mainContainer.appendChild(contenido);
        }
    },finally:function(){
      console.log("result");
    },
  });
});
$("#btn-analizar").click(function () {
  var txt = document.getElementById("my-textarea").value;
  var textLength = txt.trim().length;
  if (textLength==0) {
}
  $.ajax({
    url: "../servicios/ajaxanalizador2.js",
    method:"GET",
    data:{reseña:txt},
    dataType:"JSON",
    success: function (data) {
        console.log(data);
          //creacion de elementos donde se almacenaran las respuestas
          var mainContainer = document.getElementById("contenedor-analizado");
          var contenedorresena = document.createElement("div");
          var contenido = document.createElement("div");
          var titulo = document.createElement("div");
          var h4 =  document.createElement("h4");
          var ppositivo = document.createElement("p");
          var pnegativo = document.createElement("p");
          var pneutral = document.createElement("p");
          var punclassified = document.createElement("p");
          var calculation = document.createElement("p");
          var score = document.createElement("p");
          //agregado de clases 
          h4.className='my-4 callout callout-info ';
          mainContainer.className=' container d-flex flex-column-reverse bd-highlight mb-3 ';
          //agregamos el texto del titulo 
          h4.innerHTML = "Reseña "+(contadorcom());
          //empezamos a rellenar los elementos con la data recibida del json
         try {
          ppositivo.innerHTML='Positivos['+data.positive.length+']: ' +data.positive;
          } catch (error) {
            ppositivo.innerHTML='Positivos[0]: ';
          }
          try {
            pnegativo.innerHTML='Negativos['+data.negative.length+']: ' +data.negative;
          } catch (error) {
            pnegativo.innerHTML='Negativos[0]: ';
          }
          try {
            pneutral.innerHTML='Neutrales['+data.neutral.length+']: ' +data.neutral;
          } catch (error) {
            pneutral.innerHTML='Neutrales[0]: ' ;
          }
          try {
            punclassified.innerHTML='Indefinidos['+data.unclassified.length+']: ' +data.unclassified;
          } catch (error) {
            punclassified.innerHTML='Indefinidos[0]: ';
          }
          try {
            score.innerHTML='Calificación : ' +data.score;
          } catch (error) {
           
            score.innerHTML='Calificación : indefinida';
          }
          try {
            let string1 = "";
            let string2 = "";

              data.calculation.forEach(item => {
              const object1 = item;

              for (let property1 in object1) {
                string1 += " "+property1+" : "+object1[property1];
              }
              Object.values(object1).forEach(item => {
                string2 += item
              });
              calculation.innerHTML='Ponderación : '
              +string1;
            }
             
              
              );
           
          } catch (error) {
            console.log(error);
            calculation.innerHTML='Ponderación: error ';
          }
          //agregamos la clase text-break para que los textos sean responsivos
          contenido.className = "text-break";
          pneutral.className  = "text-break";
          punclassified.className  = "text-break";
          pnegativo.className  = "text-break";
          ppositivo.className  = "text-break";
          //agregamos las respuestas al contenedo del contenido
          contenedorresena.appendChild(titulo);
          contenido.appendChild(ppositivo);
          contenido.appendChild(pnegativo);
          contenido.appendChild(pneutral);
          contenido.appendChild(punclassified);
          contenido.appendChild(score);
          contenido.appendChild(calculation);
          //agregamos el titulo al contenedor main
          titulo.appendChild(h4);
          titulo.innerHTML+="<p><strong>Reseña :</strong> "+txt+"</p>";
          contenedorresena.appendChild(contenido);
          mainContainer.appendChild(contenedorresena);
          sumcontadorcom();
      //$("#contenedor-ejemplo").text(JSON.parse(result.unclassified));
    },finally:function(){
      console.log("result");
    },
  });
});
//funcion para limpiar el div de 
function limpiardiv(divLimpiar){
  var div =document.getElementById(divLimpiar);
  div.innerHTML = "";
}
//funcion para contador de reseñas analizadas
function sumcontadorcom(){
  contador++;
}
//funcion para contador de reseñas analizadas
function contadorcom(){
  return this.contador;
}
//funcion para contador de reseñas analizadas
function inicializar(){
  contador=1;
}