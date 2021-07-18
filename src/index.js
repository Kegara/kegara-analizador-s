const path =require('path');
const express = require('express');
const app = express();
//settings

app.set('port',process.env.PORT || 3000);
app.set('views',path.join(__dirname,'vistas'));
app.engine('html',require('ejs').renderFile);
app.set('view engine','ejs');
app.set('view engine','json');

//rutas estaticas
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));
//rutas
app.use(require("./rutas/index"));
//escuchar al server
app.listen(app.get('port'),()=>{
    console.log('server',app.get('port'));
});
//settings 