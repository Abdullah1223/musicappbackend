const express = require('express');
const SignedUrl = require('../Controllers/Authentication/SignedUrl');


const routeforpresignedurl = express.Router()

routeforpresignedurl.post('/',SignedUrl)



module.exports  = routeforpresignedurl;