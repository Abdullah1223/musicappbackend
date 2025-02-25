const express = require('express')
const Login = require('../Controllers/Authentication/Login')

const LoginRouter=express.Router()

LoginRouter.post('/',Login)


module.exports = LoginRouter