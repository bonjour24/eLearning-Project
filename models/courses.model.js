const mongoose=require('mongoose')
 
var courseSchema= new mongoose.Schema({
    name:{type:String},
    desc:{type:String},
    price:{type:Number},
});

module.exports = mongoose.model('Course',courseSchema);