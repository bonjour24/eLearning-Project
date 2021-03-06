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

let allCourse=coursey.find({});

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
        if(!err){
            if(req.body.userid=='' | req.body.password==''){
                if(req.body.userid=='' & req.body.password=='')
                    res.render('index',{
                        uid:'This field is required',
                        ups:'This field is required'
                    })
                else{
                    if(req.body.userid=='') res.render('index',{uid:'This field is required'})
                    else if(req.body.password=='') res.render('index',{ups:'This field is required'})
                }
            }
            else if(obj==null){
                res.render('index',{
                    viewTitle:'User does not exist'
                })
            }
            else if(req.body.password!=obj.password || req.body.password==null){
                res.render('index',{
                    viewTitle:'Incorrect Password'
                })
            }
            else if(req.body.password==obj.password){
                let present=obj.courses;
                coursey.find({},(err,list)=>{
                    if(err) console.log(err);
                    else{
                        for(let i=0;i<list.length;i++) {
                        let val=list[i].name;
                        if(val=>!present.includes(val))
                        {console.log(val);}
                        else console.log("PRESENT");
                        }
                    }
                })
                res.render('profilePage',{
                    user:obj

                });
            };
        }else console.log('Error in signing in');
    });
});



router.get('/courses',(req,res)=>{
    coursey.find({},(err,list)=>{
        if(err) console.log(err);
        else {
            let chunk=[];
            let size=3;
            for(let i=0;i<list.length;i+=size){
                chunk.push(list.slice(i,i+size));
            }
            console.log(chunk);
            res.render('courses',{title:'Courses',prods:chunk});
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
