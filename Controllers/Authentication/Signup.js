
const jwt = require('jsonwebtoken')
const UserManager = require("../../Models/UserSchema")
const Encryptingpassword = require("../Encryption/Encrpytingpassword");
const FuncForSignedUrl = require('./FuncForSignedUrl');
const VerificationEmailSend = require('./VerificationEmailSend');
const handleSignup = async(req,res)=>{    

    const {name,password,role,bio,fileName,fileType,fileSize}=req.body
    const email = req.body.email.toLowerCase().trim()
    const username=req.body.handle.toLowerCase().replace(/\s+/g, " ").trim();
    const randnum = Math.floor(Math.random()*10000)
    const modifiedfilename = `${randnum}:${fileName}`
    const maxSize = 13 * 1024 * 1024;
    const acceptedTypes = ['image/png','image/jpg','image/jpeg']

    //  console.log(req.body)
    //  if(req.body==null){
    //     return res.status(400).send('Please Input')
    //  }

    //  const CheckingForExiststence = await UserManager.exists({$or:[{email:email},{username:username}]})
    //  console.log(CheckingForExiststence)
        
    //  if(CheckingForExiststence==null){
    //     const Encrpytedpassword = await Encryptingpassword(password)
    //     let userPayload = {
    //         name: name,
    //         email: email,
    //         username: username,
    //         password: Encrpytedpassword,
    //         role:role,
    //         bio:bio,
    //         isValidated:false
    //     };
    //     const CreatingUser = await UserManager.create(userPayload)
    //     //have to produce in kafka for email verification
    //       console.log(fileName,fileType,fileSize)
    //  // const GettingSignedUrl= await FuncForSignedUrl(finalfilename,fileType,fileSize)
    //   //console.log(GettingSignedUrl)     
    //  }{
    //     console.log('Username or passsword exists')
    //  }
    if(req.body==null){
        return res.status(400).send('Please Input')         
    }
    if(!fileName.trim() || fileSize==0 || !fileType.trim()){
    
        return res.status(404).send({Message:"Please Upload File"})
    }
    if(fileSize>maxSize || !acceptedTypes.includes(fileType)){
        return  fileSize>maxSize ? 
       res.status(413).send({Message:'Image Size Exceeds 10 Mb Make Sure Image is not greater than 10 mb'})
       :res.status(415).send({Message:'Unsupported File Type'})
     }
    const Encrpytedpassword = await Encryptingpassword(password)

     try{
        let SignedUrl
        let FileKeyName
        let userPayload = {
                    name: name,
                    email: email,
                    avatar:modifiedfilename,
                    username: username,
                    password: Encrpytedpassword,
                    role:role,
                    bio:bio,
                    isValidated:false
                };
                
        const CreatingUser = await UserManager.create(userPayload)
         
          if(CreatingUser){
            VerificationEmailSend(email,modifiedfilename)

           const GettingSignedUrl = await FuncForSignedUrl(modifiedfilename,fileSize,fileType)
           console.log(GettingSignedUrl)  

           SignedUrl=GettingSignedUrl.SignedUrl
           FileKeyName=GettingSignedUrl.filename
        
          }
          return res.status(200).send({SignedUrl,FileKeyName})
        //this isworkable  code i just commented to test kafka consumer verifiication send  function
               





        // const payload ={
        //     _id:CreatingUser._id,
        //     role:req.body.role,
        // }
        //  const token = jwt.sign({payload},process.env.SECRET_KEY,{ expiresIn: '15m' })
        //  console.log(token)
        //  res.cookie('token', token, {
        //     httpOnly: true,
        //     secure: true,
        //     //sameSite:'Strict'
        //     sameSite: 'None',
        //     maxAge: 15*60*1000,
        // });
        // const userPayload2 ={
        //     id:CreatingUser?._id,
        //     name:CreatingUser?.name,
        //     role:CreatingUser?.role,
        //     avatar:CreatingUser?.avatar,
        //     handle:CreatingUser?.username,
        //     bio:CreatingUser?.bio,
        //     followers:CreatingUser?.followers?.length,
        //     following:CreatingUser?.following?.length,
    
        // }
        // res.status(200).send(userPayload2)
     }catch(error){
         if(error.code===11000){
            const field = Object.keys(error.keyValue)
            console.log('Error Throwed')
            return res.status(400).send(field)
         }
     }
         
}


module.exports ={
    handleSignup
}