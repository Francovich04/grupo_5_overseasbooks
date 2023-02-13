const express = require('express');
const routerLoginRegister = express.Router();
const {login, register, passwordreset, processRegister} = require('../controllers/loginRegisterControllers');
const multer = require('multer')
const path = require('path')
const { body } = require('express-validator')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/images/avatars'))
    },
    filename: (req, file, cb) => {
        const newFile = `/product-${Date.now()}_img${path.extname(file.originalname)}`
        cb(null, newFile)
    }
});

const upload = multer({ storage });

const validations = [
    body('nombre').notEmpty().withMessage("Debes escribir tu nombre"),
    body('apellido').notEmpty().withMessage("Debes escribir tu apellido"),
    body('email').notEmpty().withMessage("Debes escribir tu email"),
    body('password').notEmpty().withMessage("Debes escribir tu contraseña"),
]

routerLoginRegister.get('/login', login );
routerLoginRegister.get('/register', register);
routerLoginRegister.post('/register', upload.single('avatar'), validations, processRegister);
routerLoginRegister.get('/passwordreset', passwordreset);



module.exports = routerLoginRegister;