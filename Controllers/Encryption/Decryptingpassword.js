const bcrypt = require('bcrypt')
const DecryptingPassword = (password,hash)=>{

   const ComparedPassword =   bcrypt.compare(password, hash)
    return ComparedPassword;
}

module.exports = DecryptingPassword;