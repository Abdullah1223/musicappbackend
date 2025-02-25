const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const DecryptingPassword = require('../Encryption/Decryptingpassword')
const UserManager = require('../../Models/UserSchema')
const CreatingJwtTokens = require('../JwtTokens/CreatingJwtTokens')

const Login=async(req,res)=>{
   const token=req.cookies.token
   if(token){
    return res.status(400).send({message:'You Are Already Logged In'})
   }
   try{
    const {password}=req.body
    const email = req.body.email.toLowerCase()
    const ValidatingUser = await UserManager.findOne({email:email}) 
    console.log(ValidatingUser)
    const payload={
        _id:ValidatingUser?._id,
        role:ValidatingUser?.role,
    }
    const userPayload ={
        id:ValidatingUser?._id,
        name:ValidatingUser?.name,
        role:ValidatingUser?.role,
        avatar:ValidatingUser?.avatar,
        handle:ValidatingUser?.username,
        bio:ValidatingUser?.bio,
        followers:ValidatingUser?.followers?.length,
        following:ValidatingUser?.following?.length,

    }
    if(ValidatingUser){
        const PasswordCompared =  await DecryptingPassword(password,ValidatingUser?.password)
        if(PasswordCompared===true){
           
            CreatingJwtTokens(payload,res)
            return res.status(200).send(userPayload)
        }else{
            return res.status(400).send({message:'Invalid Password '})
        }
    }
    else{
        return res.status(404).send({message:'This User Does Not Exists Please Signup'})
    }
   }catch(err){
    console.log(err)
   }
}

module.exports = Login