const express = require('express');
const PasswordRecoveryCodeValidation = require('../Controllers/Authentication/PasswordRecoveryCodeValidation');

const routeforpasswordcodevalidation = express.Router()

routeforpasswordcodevalidation.post('/',PasswordRecoveryCodeValidation )

module.exports  = routeforpasswordcodevalidation;