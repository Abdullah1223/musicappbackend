const express = require('express')
const Logout = require('../Controllers/Authentication/Logout')
const routerforlogout = express.Router()

routerforlogout.get('/',Logout)


module.exports = routerforlogout