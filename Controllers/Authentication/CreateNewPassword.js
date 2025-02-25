const UserManager = require('../../Models/UserSchema')
const RedisManager = require('../../RedisConnection/RedisConnection')
const Encryptingpassword = require('../Encryption/Encrpytingpassword')
const CreateNewPassword=async(req,res)=>{
    if(req.body==null){
        return res.status(404).send({message:'Input Something Nothing Found!'})
    }
      const {password,confirmpassword}=req.body.Passwords
      const {email}=req.body

    try{
        const HashedPassword = await Encryptingpassword(password)
        if(HashedPassword){
            const CreatingNewPassword = await UserManager.updateOne({email:email},{
                $set:{
                    'password':`${HashedPassword}`,
                }
               })
               if(CreatingNewPassword){
                RedisManager.del(`${email}`)
                return res.status(200).send({message:'Password is Changed'})    
               }else{
                return res.status(400).send({message:'Password was not Updated'})
               }
        }
    }catch(error){
        console.log(error)
    }
    
    
}

module.exports = CreateNewPassword;