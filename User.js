const mongoose  =require('mongoose') ;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken') ; 
const epxressjwt = require('express-jwt') 

require('dotenv').config() ; 
const UserSchema = new  mongoose.Schema({
    name :{
        type : String , 
        required : true , 
    } , 
    password :{
        type :String , 
        minlength : 6 , 
        required : true , 

    },
    email : {
        type : String ,
        required : true , 
        match :[
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        ] ,
      

    }

})
UserSchema.pre('save', function(next){
    const user = this
    bcrypt.hash(user.password, 10, (error, hash) => {
    user.password = hash
    next()
    })
    })
UserSchema.methods.isMatch = async function(enterpassword) {
    return await bcrypt.compare(enterpassword , this.password)
}


module.exports = mongoose.model('User' , UserSchema) ; 
