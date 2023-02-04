const express = require('express');
const routerLoginRegister = express.Router();
const {login, register,passwordreset} = require('../controllers/loginRegisterControllers');


routerLoginRegister.get('/login', login );
routerLoginRegister.get('/register', register );
routerLoginRegister.get('/passwordreset', passwordreset);



module.exports = routerLoginRegister;