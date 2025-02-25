const jwt = require('jsonwebtoken')
const CookieCheck = (req,res)=>{
    const token = req.cookies.token
    if(!token){
        return res.status(404).send({message:'No User Is Logged In'})
    }else{
       jwt.verify(token,process.env.SECRET_KEY,(err,decoded)=>{
        if(err){
           
            res.clearCookie('token', {
                httpOnly: true, // Ensures it can only be accessed by the server
                secure: true, // Ensures it's only sent over HTTPS in production
                sameSite: 'Strict', // Restrict the cookie to same-site requests
            });
            return res.status(400).send({message:'Token is Tampered'})
            
        } 
        console.log(decoded)
        return res.status(200).send(decoded) 

       }) 
    }
}
module.exports = CookieCheck