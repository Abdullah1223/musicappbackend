const express = require('express')
const ResendValidationCode = require('../Controllers/Authentication/ResendValidationCode')


const routeforresendvalidationcode = express.Router()

routeforresendvalidationcode.post('/',ResendValidationCode)

module.exports = routeforresendvalidationcode