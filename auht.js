const jwt = require('jsonwebtoken');  
const express_jwt = require('express-jwt'); 
const signup = require('./signup')
const user =require('./User') ;  
exports.requirelogin = async (req,res,next)=>{

const data  =  await   user.findOne({_id : req.session.user});
if(data){
    return next() ; 
}

res.render("requirelogin"); 

} 