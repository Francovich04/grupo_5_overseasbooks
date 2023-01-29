const express = require('express');
const routerLoginRegister = express.Router();
const {login, register} = require('../controllers/loginRegisterControllers');


routerLoginRegister.get('/login', login );
routerLoginRegister.get('/register', register );



module.exports = routerLoginRegister;