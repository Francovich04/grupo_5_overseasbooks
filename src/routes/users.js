const express = require('express');
const routerLoginRegister = express.Router();
const { login,
    register,
    passwordreset,
    processRegister,
    processLogin,
    userProfile,
    userLogout } = require('../controllers/userControllers');
const authMiddleware = require('../middlewares/authMiddleware');

const guestMiddleware = require('../middlewares/guestMiddleware');
const multerMiddleware = require('../middlewares/multerMiddleware');
const validations = require('../validations/allValidations');

routerLoginRegister.get('/user/login', guestMiddleware, login);
routerLoginRegister.post('/user/login', validations.emailValidations, processLogin);
routerLoginRegister.get('/user/register', guestMiddleware, register);
routerLoginRegister.post('/user/register', multerMiddleware.usersUpload.single('avatar'), validations.userValidations, processRegister);
routerLoginRegister.get('/user/passwordreset', passwordreset);
routerLoginRegister.get('/user/profile', authMiddleware, userProfile);
routerLoginRegister.get('/user/logout', userLogout)



module.exports = routerLoginRegister;