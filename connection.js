const mongoose = require('mongoose') ; 
require('dotenv').config() ;


mongoose.connect(process.env.url , {useNewUrlParser : true , useUnifiedTopology : true} , ()=>{
    console.log('connected') ; 
}) ;
    
 
// module.exports = mongoose ; 




