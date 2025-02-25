const express = require('express')
const CreateNewPassword = require('../Controllers/Authentication/CreateNewPassword')
const routeforcreatenewpassword = express.Router()

routeforcreatenewpassword.post('/',CreateNewPassword)


module.exports =routeforcreatenewpassword