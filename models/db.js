"use strict";
const mongoose=require('mongoose')
require('dotenv/config')
mongoose.connect(process.env.DB_CONNECTION,{useNewUrlParser:true,useUnifiedTopology:true}, (err)=>{
    if(!err) console.log('MongoDB connected succesfully')
    else console.log(err)
})

require('./user.model');
require('./courses.model');