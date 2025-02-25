const bcrypt = require('bcrypt')
const Encryptingpassword = (password)=>{
   
    const EncryptedPassword =bcrypt.hash (password, 10,);


    return EncryptedPassword;
}

module.exports = Encryptingpassword;