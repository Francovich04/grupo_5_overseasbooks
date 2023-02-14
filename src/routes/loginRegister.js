const express = require('express');
const routerLoginRegister = express.Router();
const {login, register, passwordreset, processRegister, processLogin} = require('../controllers/loginRegisterControllers');
const multer = require('multer')
const path = require('path')
const { body } = require('express-validator')
const guestMiddleware = require('../middlewares/guestMiddleware')

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
    body('email')
       .notEmpty().withMessage("Debes escribir tu email").bail()
       .isEmail().withMessage("Debes escribir un formato de email valido"),
    body('password').notEmpty().withMessage("Debes escribir tu contraseña"),
    body('avatar').custom((value, {req}) => {
        let file = req.file;
        if (!file) {
            throw new Error('Debes subir una imagen')
        }
        return true;
    })
]

const validations1 = [
    body('email')
       .notEmpty().withMessage("Debes escribir tu email").bail()
       .isEmail().withMessage("Debes escribir un formato de email valido"),
    body('password').notEmpty().withMessage("Debes escribir tu contraseña")
]

routerLoginRegister.get('/login', guestMiddleware, login );
routerLoginRegister.post('/login', validations1, processLogin);
routerLoginRegister.get('/register', guestMiddleware, register);
routerLoginRegister.post('/register', upload.single('avatar'), validations, processRegister);
routerLoginRegister.get('/passwordreset', passwordreset);



module.exports = routerLoginRegister;