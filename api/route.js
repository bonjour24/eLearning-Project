"use strict";
const express=require('express');
const router=express.Router();
router.use(express.static('/public'))
const mongoose=require('mongoose');
const parse=require('body-parser');
const User=require('../models/user.model');
const Course=require('../models/courses.model');
const usey=mongoose.model('User');
const coursey=mongoose.model('Course');
const urlencodedParser = parse.urlencoded({ extended: false });

router.get('/',(req,res)=>{
    res.render('index',{title:'Welcome!'});
});

router.get('/thanks',(req,res)=>{
    res.render('thankYou',{title:'Thank You!',layout:null})
});

router.get('/profile',(req,res)=>{
    res.render('profile');
})
router.post('/signUp',urlencodedParser,(req,res)=>{
    User.findOne({userid:req.body.userid},(err,obj)=>{
        if(obj===null) {
            console.log("In If");
            addUser(req,res);
            res.render('thankYou',{name:req.body.name,layout:null});
        }
        else {
            console.log("In else");
            res.render('Taken',{title:'LOL!',layout:null});
        };
    });
});

router.post('/login',urlencodedParser,(req,res)=>{
    User.findOne({userid:req.body.userid},(err,obj)=>{
        if(obj===null){
            // res.render('notFound',{title:'Not Found',layout:null});
            console.log('Not Found!');
        }
        else{
            if(obj.password!==req.body.password)    console.log("Found!");
            else    console.log("Not Found!");
        };
    });
});




function addUser(req,res){
    let user=new User();
    user.name=req.body.name;
    user.userid=req.body.userid;
    user.password=req.body.password;
    user.courses=[];
    user.save((err,doc)=>{
        if(!err) console.log('Signup successful');
        else{
            if(err.name=='ValidationError'){
                handleValidationError(err,req.body);
                res.render("home",{user: req.body});
            }
            else console.log('error in Signing up');
        }
    });
};

function checkUser(req,res){
    User.findOne({userid:req.body.userid},(err,obj)=>{
        if(obj==null) {
            res.render('useless');
        }
        else {
            res.render('thankYou');
        }
    });
};

function handleValidationError(err,body){
    for(field in err.errors){
        switch(err.errors[field].path){
            case 'name':
                body['nameError']=err.errors[field].message;
                break;
            case 'userid':
                body['useridError']=err.errors[field].message;
                break;
            case 'password':
                body['passwordError']=err.errors[field].message;
                break;
            default: break;
        }
    }
};
module.exports=router;
