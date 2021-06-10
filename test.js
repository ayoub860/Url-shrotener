var chai = require('chai')
let chaiHttp = require('chai-http');
let should = chai.should();
 
const app = require('./server');
chai.use(chaiHttp);
describe("Get Home page" , ()=>{
    it('should return home page', ()=>{
            chai.request(app)
        .get('/') 
        .end((err,res)=>{
            res.should.have.status(200);
        
        
        })
        })
    });

describe('Get signup Page', ()=>{
    it('should return signup page' , ()=>{
        chai.request(app)
        .get("/signup")
        .end((err,res)=>{
            res.should.have.status(200);
        

        })
    })
})
describe('create user', ()=>{
    it('should direct me to login page if there is no error and create a user in the data base ', ()=>{
chai.request(app)
.post("/createuser")
.send({
    email : "hakim@gmail.com" , 
    password :"123456" , 
    name : "ayoub" 
}) 
.end((err,res)=>{
res.should.have.status(200); 
res.body.error.should.equal(false);
})
    })
})
describe('log out' , ()=>{
    it('should logout user and redirect him to home page' ,()=>{
        chai.request(app)
        .get('/logout')
        .end((err,res)=>{
            res.should.have.status(200); 

        })
    })
    
})
describe("create Url shortener"  ,()=>{
    it('should generate a random  string  if user is login',()=>{
        chai.request(app)
        .post('/')
        .send({
            url : 'https://facebook.com'
        })
        .end((err,res)=>{
            res.should.have.status(201); 
            res.body.error.should.equal(false);
        })
    })
})

describe('opening the url from the shortid that we generate' , ()=>{
it('should redirect us to the main url from the shortid that we generate ' ,()=>{
    chai.request(app)
    .get(':/shortid')
    .end((err,res)=>{
        res.should.have.status(201); 
    
    })
}) 
}) 

describe('user login ' , ()=>{
    it('should allow us to create a url shortener ' ,()=>{
        chai.request(app)
        .post('/login')
        .send({
            email:'hakim@gmail.com', 
            password :'123456'
        })
        .end((err,res)=>{
            res.should.have.status(201); 
        
        })
    })
    }) 