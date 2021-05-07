const express = require('express')
const mongoose = require('mongoose')
const connection  = require('./connection')
const ShortUrl = require('./Url') ;
const body_parser  =require('body-parser'); 
const authentication = require('./auht')
const User = require('./User')
const cookieParser = require('cookie-parser')
const express_session = require('express-session'); 
const path = require('path') ; 
const app = express(); 
const connect  =require("connect-flash") ; 
const redirect = require('./redirect')
const routes = require('./signup'); 
const connectflash = require('connect-flash')

app.set('view engine', 'ejs')
app.use(body_parser.json())

app.use(express.urlencoded({ extended: false }))
app.use(cookieParser()); 
app.use(express_session({secret: process.env.secret}))
app.use(connect()); 
app.use(routes) ; 
app.get('/', async (req, res) => {
  const data = await ShortUrl.find() ; 
  res.render('index' , {
    shortUrls : data , 
  
  })

})

app.post('/',authentication.requirelogin ,  async (req, res) => {
const user = new ShortUrl({
  url : req.body.url  
})
// req.flash('Error' , 'Please Log In ')
user.save().then(()=>{
  res.redirect('/');
})
.catch((err)=>{
  res.send(err)
})
})

app.get('/:shortUrl', async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl})
  if (shortUrl == null) return res.sendStatus(404)


  res.redirect(shortUrl.url)
})


app.use((req,res,next)=>{
  res.render('404') ;
  next() ; 
})


let port = process.env.PORT;
if (port == null || port == "") {
port = 4000;
}
app.listen(port, ()=>{
console.log('App listening...')
})
