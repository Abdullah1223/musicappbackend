const express = require('express');
const CookieCheck = require('../Controllers/Authentication/CookieCheck');

const routerforcookiecheck = express.Router();

routerforcookiecheck.get('/',CookieCheck)


module.exports = routerforcookiecheck;