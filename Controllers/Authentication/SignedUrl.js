const {getObjectUrlForUpload}=require('../Authentication/AwsConnection/AwsS3Client')
const SignedUrl = async(req,res)=>{
  try{
    const {finalfilename,fileSize,fileType} = req.body
    const randnum = Math.floor(Math.random()*10000)
     const filename = `${finalfilename}:${randnum}`
    const maxSize = 13 * 1024 * 1024;
    const acceptedTypes = ['image/png','image/jpg','image/jpeg']
    if(!finalfilename.trim() || fileSize==0 || !fileType.trim()){
      return res.status(404).send({Message:"Please Upload File"})
    }
    if(fileSize>maxSize || !acceptedTypes.includes(fileType)){
      return  fileSize>maxSize ? 
      res.status(413).send({Message:'Image Size Exceeds 10 Mb Make Sure Image is not greater than 10 mb'})
      :res.status(415).send({Message:'Unsupported File Type'})
    }
  
    const SignedUrl = await getObjectUrlForUpload(`Uploads/User_Uploads/Profilepictures/${filename}`,fileType)
    console.log(SignedUrl)
    if(SignedUrl){
      return res.status(200).send({bucketsignedurl:SignedUrl,filename:filename})
    }

    return res.status(400).send({Message:"Could'nt Generate Presigned Url"})
  
}catch(err){
 console.log(err)
 return res.status(502).send({Message:'Internal Server Error Please Try Later'})
}

}

module.exports = SignedUrl;