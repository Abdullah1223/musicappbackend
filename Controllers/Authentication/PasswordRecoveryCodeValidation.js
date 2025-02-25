const RedisManager = require("../../RedisConnection/RedisConnection")
const DecryptingPassword = require("../Encryption/Decryptingpassword")

const PasswordRecoveryCodeValidation = async(req,res)=>{
    const {email,Code}=req.body
    if(req.body==null){
        return res.status(404).send({message:'Please Enter Code'})
    }
   try{
    const HashedCode = await RedisManager.get(`${email}`)
    if(HashedCode){
        const DecryptedCode = await DecryptingPassword(`${Code}`,`${HashedCode}`)
        if(DecryptedCode===true){
           return res.status(200).send({message:'Code is Valid'})
        }else{
           return res.status(404).send({message:'code is invalid'})
        }

    }
     
    return  res.status(401).send({message:'Time has passed Try Again Code is invalidated'})
   }catch(err){
    console.log(err)
   }

}

module.exports = PasswordRecoveryCodeValidation;