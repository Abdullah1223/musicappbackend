const express = require('express');
const { handleSignup } = require('../Controllers/Authentication/Signup');

const router = express.Router();

router.post('/',handleSignup)



module.exports= router;