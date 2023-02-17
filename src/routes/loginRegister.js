const express = require('express');
const routerLoginRegister = express.Router();
const { login,
    register,
    passwordreset,
    processRegister,
    processLogin } = require('../controllers/loginRegisterControllers');

const guestMiddleware = require('../middlewares/guestMiddleware');
const multerMiddleware = require('../middlewares/multerMiddleware');
const validations = require('../validations/allValidations');

routerLoginRegister.get('/login', guestMiddleware, login);
routerLoginRegister.post('/login', validations.emailValidations, processLogin);
routerLoginRegister.get('/register', guestMiddleware, register);
routerLoginRegister.post('/register', multerMiddleware.usersUpload.single('avatar'), validations.userValidations, processRegister);
routerLoginRegister.get('/passwordreset', passwordreset);



module.exports = routerLoginRegister;