const express = require('express');
const PasswordRecovery = require('../Controllers/Authentication/PasswordRecovery');

const routeforpasswordrecovery = express.Router();

routeforpasswordrecovery.post('/',PasswordRecovery)

module.exports = routeforpasswordrecovery ;