const chai = require('chai');
const chaihttp = require('chai-http');
const server = require('./server') 
chai.should() ; 
chai.use(chaihttp);

describe("Get Home page" , ()=>{
    it('should return the home page', async (done)=>{
        chai.request(server)
        .get('/')
        .end( (err,res)=>{
            res.should.have.status(200); 
            res.body.should.be.a("object") ; 
           

        })
        await done() ;  
    })

})


describe("generate a url " , ()=>{
    it('should generate a random string if user is logged in ', async (done1)=>{
        const task = {
            url : 'https://facebook.com', 
        }
        chai.request(server)
        
        .post('/')
        .send(task)
        .end( (err,res)=>{
            res.should.have.status(201); 
            res.body.should.be.a('object'); 
            res.body.should.have.property('url') ; 
            res.body.should.have.property('_id') ;
            res.body.should.have.property("short");  

        })
     await done1() ;
    })

})

describe("Get a url " , ()=>{
    it('should  redirect  us to the main url ' ,async  (done3)=>{
        chai.request(server)
        .get('/:shortUrl') 
        .end((err,res)=>{
            res.should.have.status(200);

        })
        await done3() ;

    })
})


describe("logout  user " , ()=>{
    it('should  logout user and redirect them to home page' ,async  (done3)=>{
        chai.request(server)
        .get('/logout') 
        .end((err,res)=>{
            res.should.have.status(200);

        })
        await done3() ;

    })
})

describe("get singup page " , ()=>{
    it('should   render user to signup page' ,async  (done4)=>{
        chai.request(server)
        .get('/signup') 
        .end((err,res)=>{
            res.should.have.status(200);

        })
        await done4() ;

    })
})

describe("get login page " , ()=>{
    it('should   render user to login page' ,async  (done5)=>{
        chai.request(server)
        .get('/login') 
        .end((err,res)=>{
            res.should.have.status(200);

        })
        await done5() ;

    })
})

describe("Create a new user"  , ()=>{
    it("should create a new user and save it in the  database" , async (done6)=>{
        const user = {
            name : 'ayoub', 
            password : 'ayoub1234' , 
            email : 'hakim124@gmail.com' 
        }
  chai.request(server)
  .post('/createuser')
  .send(user)
  .end((err,res)=>{
    res.body.should.be.a('object'); 
    res.body.should.have.property('name') ; 
    res.body.should.have.property("email");
    res.body.should.have.property("password");   
    res.body.should.have.property('_id') ;

  })
  await done6() ;
    })
})

describe("login  user"  , ()=>{
    it("should login the user and allow to generate a url " , async (done7)=>{
        const user = {
            password : 'ayoub1234' , 
            email : "hakim124@gmail.com" 
        }
  chai.request(server)
  .post('/login')
  .send(user)
  .end((err,res)=>{
    res.body.should.be.a('object');  
    res.body.should.have.property("email");
    res.body.should.have.property("password");   
    res.body.should.have.property('_id') ;

  })
  await done7() ;
    })
})

