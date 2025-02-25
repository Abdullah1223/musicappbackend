const mongoose = require('mongoose');
const UserManager = require('../../Models/UserSchema');
const math = require('mathjs')
const nodemailer = require('nodemailer');
const Encryptingpassword = require('../Encryption/Encrpytingpassword');
const RedisManager = require('../../RedisConnection/RedisConnection');

const PasswordRecovery= async(req,res)=>{
   
    if(req.body==null){
        return res.status(400).send({message:'Please Enter A Email'})
    }
   transporter = nodemailer.createTransport({
    service:'gmail',
    port:465,
    secure:true,
    auth:{
        user:'testtust21@gmail.com',
        pass:'gluw kcao qhuh vkgg'
    }
   })
    const email = req.body.email
   
   const CheckingForEmail = await UserManager.findOne({email:email})
   if(CheckingForEmail){
    const randomnumber= math.floor(math.random(1,10000))
    const hashedcode = await Encryptingpassword(`${randomnumber}`)
    try{
        const info = await transporter.sendMail({
            from: 'testtust21@gmail.com', // sender address
            to: `${email}`, // list of receivers
            subject: "Recover Your Password", // Subject line
            text: 'This Is Your Code '+randomnumber, // plain text body
          });
          if(info){
           RedisManager.setex(`${email}`,360,hashedcode )
          }
    }catch(err){
        console.log(err)
    } 
    
    res.status(200).send({message:'Code Send'})
   }else{

    return res.status(404).send({message:email})
   }

}

module.exports = PasswordRecovery;