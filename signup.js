const express = require('express');
const user = require('./User')
const auth = require('./auht') ; 
const cookie = require('cookie-parser')
const router = express.Router() ; 
const redirect = require('./redirect')
const connectflash = require('connect-flash')
router.use(connectflash()); 
router.use((req, res, next) => {
    res.locals.message = req.session.message ;
    delete req.session.message ;     
    next();
   });

router.get('/signup'  ,  (req,res)=>{
    res.render("signup")
})
router.post('/createUser', async (req,res)=>{
await user.findOne({email:req.body.email})
.then((exist)=>{
    if(exist){
        req.session.message  = {
            type :'dark' , 
            Flashmessage :'User already exist' 
        }
        res.redirect('/signup')
    }
}).then(async()=>{
    await user.create({
        ...req.body , 
        }).then(()=>{
            req.session.message = {
                type :'success', 
                Flashmessage : 'Welcome Please Login' 
            }
        res.redirect('/login')
    }).catch((err)=>{
        // console.log(err)
    })
})
 

    

})


router.get('/login',(req,res)=>{
    res.render('login') 
})
router.post("/login" , async (req,res,next)=>{
    const {password , email} = req.body ; 
    if(!password || !email){
       req.session.message = {
           type : "warning" , 
           Flashmessage : "Please insert the requested information" 
       }
       res.redirect('/login')
    }
   const users  = await user.findOne({email}).select('+password'); 
if(!users){
    req.session.message = {
        type :'warning' , 
        Flashmessage : 'Invalid  Credential Please Signup'
    }
    res.redirect("/signup"); 

} 
const isMatch = await users.isMatch(password); 
if(!isMatch){
   req.session.message = {
        type :"danger" , 
        Flashmessage : "password do not  match" 
    }
    res.redirect('/login') ; 
}

    req.session.user = users ; 
    res.redirect("/")

})
router.get("/logout",async (req,res)=>{

  await   req.session.destroy();
    res.redirect('/');
})

router.get('/message'  ,(req,res)=>{
    res.send(req.flash("error"))
})
global.loggedIn = null; 
router.use('*' , (req,res,next)=>{
    loggedIn = req.session.user ; 
    next(); 
})

module.exports = router ; 