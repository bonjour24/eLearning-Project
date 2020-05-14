const express=require('express');
const app=express();
const expbs=require('express-handlebars') ;
require('./models/db');
const mongoose=require('mongoose');
const path=require('path');
const parse=require('body-parser');
const mainRouter=require('./api/route');

//Middleware
const urlencodedParser = parse.urlencoded({ extended: false });

//Setting up basics
app.engine('handlebars',expbs({
    defaultLayout:'main',
    layoutsDir:path.join(__dirname,'views/layouts')
}));
app.set('view engine','handlebars');
app.use(express.static('public'));
app.use('/',express.static(__dirname+'/public'));
app.use('/',mainRouter)

//Port listen
app.listen(8000,()=>{
    console.log("running!");
});