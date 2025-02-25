const VerificationEmailSend = require("./VerificationEmailSend")

const ResendValidationCode = async(req,res)=>{
    const Email = req.body?.Email.toLowerCase()
    if(!Email){
    return res.status(404).send({Message:'Please Do Not Send Empty Values'})
   }
  try{
    
   VerificationEmailSend(Email,null)
 
   return res.status(200).send({Message:'Code Has Been Sent To Your Email Please Check'})
  }catch(err){
    console.log(err)
    return res.status(502).send({Message:'Server Error'})
  }

}

module.exports = ResendValidationCode