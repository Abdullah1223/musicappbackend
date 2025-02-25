const UserManager = require("../../Models/UserSchema");
const RedisManager = require("../../RedisConnection/RedisConnection");
const { getObjectUrl } = require("./AwsConnection/AwsS3Client");

const SignupValidation = async (req, res) => {
  const { Code, } = req.body;
  const Email = req.body?.Email?.toLowerCase()
  if (!Code || !Email) {
    return res.status(404).send({ Message: "Please Send Code" });
  }

  try {
    const GettingValidationCode = await RedisManager.get(
      `${Email}:ValidationCode`
    );
    if (GettingValidationCode != null) {
      const parsedData = JSON.parse(GettingValidationCode);

      if (parsedData.ValidationCode == Code) {
        const fileName = await RedisManager.get(`${Email}:profilePicName`);
        if (fileName) {
          const parsedFileData = JSON.parse(fileName);
          const filenameforaws = parsedFileData.filename;

          const signedUrl = await getObjectUrl(`Uploads/User_Uploads/Profilepictures/${filenameforaws}`);

          if (signedUrl) {
            const updateProfileField = await UserManager.findOneAndUpdate(
              { email: Email },
              {
                $set: {
                  'avatar': signedUrl,
                  'isValidated':true,
                },
              }
            );

            if (updateProfileField) {
               await RedisManager.multi().del(`${Email}:ValidationCode`).del(`${Email}:profilePicName`).exec() 
              return res.status(200).send({Message:'You are Validated'});
            }
          }
        }
      }

      return res.status(410).send({ Message: "Please Enter Correct OTP " });
    }

    return res
      .status(401)
      .send({ Message: "Please Get New Code Previous One Has Been Expired" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ Message: "Server Error" });
  }
};

module.exports = SignupValidation;
