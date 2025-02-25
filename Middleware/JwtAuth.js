const jwt = require('jsonwebtoken')
const JwtAuth = (req,res,next)=>{
   const token = req.cookies.token
  
   if(!token) return res.status(400).send({message:'Not Logged in'})
   
    const Verified = jwt.verify(token,process.env.SECRET_KEY,(err,decoded)=>{
      if(err){
         return res.status(403).send({Message:'Invalid Token Do Not Temper With It'})
        }
      
    req.body = decoded;    
    next();
    })
    
    
}

module.exports = JwtAuth;