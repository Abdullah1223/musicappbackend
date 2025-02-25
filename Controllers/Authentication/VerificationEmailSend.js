const RedisManager  = require('../../RedisConnection/RedisConnection')
const {producer} = require('../../KafkaConnection/KafkaConnection')
const VerificationEmailSend = async(email,filename)=>{
    const RedisPipeline = RedisManager.pipeline()
    const ValidationCode = Math.floor(Math.random()*10000)
  
    const Data = {
        ValidationCode,
        email,
        type:'Email_Verification'
  
    }
    FileData = {
        email,
        filename
       }
    if(filename==null){
        await producer.send({topic:'MusicAppNew',messages:[{value:JSON.stringify(Data),partition:7}]})
        await RedisManager.set(`${email}:ValidationCode`,JSON.stringify(Data),'EX',240)
               
    }else{

        
   await producer.send({topic:'MusicAppNew',messages:[{value:JSON.stringify(Data),partition:7}]})
   RedisPipeline.set(`${email}:ValidationCode`,JSON.stringify(Data),'EX',240)
   RedisPipeline.set(`${email}:profilePicName`,JSON.stringify(FileData))   
   await RedisPipeline.exec()
    }
   
   
      
}

module.exports= VerificationEmailSend