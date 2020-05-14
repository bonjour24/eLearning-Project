const mongoose=require('mongoose')
 
var userSchema= new mongoose.Schema({
    name:{type:String,required:'This field is required'},
    userid:{type:String,required:'This field is required'},
    password:{type:String,required:'This field is required'},
    courses:[{
        name:{type:String}
    }],
});

module.exports = mongoose.model('User',userSchema);