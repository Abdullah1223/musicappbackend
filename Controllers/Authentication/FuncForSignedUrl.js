const { getObjectUrlForUpload } = require("./AwsConnection/AwsS3Client");

const FuncForSignedUrl = async(finalfilename,fileSize,fileType)=>{
    try{
        
        // const randnum = Math.floor(Math.random()*10000)
        //  const filename = `${randnum}:${finalfilename}`
        const maxSize = 13 * 1024 * 1024;
        const acceptedTypes = ['image/png','image/jpg','image/jpeg']
        if(!finalfilename.trim() || fileSize==0 || !fileType.trim()){
            return false
            //return res.status(404).send({Message:"Please Upload File"})
        }
        if(fileSize>maxSize || !acceptedTypes.includes(fileType)){
           return false;
        //     return  fileSize>maxSize ? 
        //   res.status(413).send({Message:'Image Size Exceeds 10 Mb Make Sure Image is not greater than 10 mb'})
        //   :res.status(415).send({Message:'Unsupported File Type'})
        }
      
        const SignedUrl = await getObjectUrlForUpload(`Uploads/User_Uploads/Profilepictures/${finalfilename}`,fileType)
        //console.log(SignedUrl)
        if(SignedUrl){
          return {SignedUrl,finalfilename}
        }
    
        return false
      
    }catch(err){
     console.log(err)
     return false
    }
    
}

module.exports = FuncForSignedUrl