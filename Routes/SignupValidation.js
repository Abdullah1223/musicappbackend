const express = require('express')
const SignupValidation = require('../Controllers/Authentication/SignupValidation')


const routeforsignupvalidation = express.Router()

routeforsignupvalidation.post('/',SignupValidation)

module.exports =routeforsignupvalidation