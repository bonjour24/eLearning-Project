const mongoose=require('mongoose')
 
var courseSchema= new mongoose.Schema({
    name:{type:String},
    desc:{type:String},
    price:{type:Number},
});

let one=mongoose.model('one',courseSchema);
let two =new one();
    two.name="Python";
    two.desc="This offers all the basic concepts of Python";
    two.price=0;
    two.save((err,doc)=>{
        if(!err) console.log("Added");
        else
            console.log(err);
});
module.exports = mongoose.model('Course',courseSchema);