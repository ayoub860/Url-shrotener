exports.redirect  = (req, res,next) =>{
    if(req.session.userId){
 res.render("/");
    next() ;
    }
    
    }
    