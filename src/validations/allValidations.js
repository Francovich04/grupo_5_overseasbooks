const path = require('path');
const { body } = require('express-validator');

const productValidations = [
    body('titleEng').notEmpty().withMessage('Escribí el titulo en Inglés'),
    body('titleEsp').notEmpty().withMessage('Escribí el titulo en Español'),
    body('color').notEmpty().withMessage('Selecioná un color de encabezado de tarjeta'),
    body('author').notEmpty().withMessage('Escribí un autor'),
    body('category').notEmpty().withMessage('Seleciona una categoría'),
    body('price').notEmpty().withMessage('Escribí un precio válido'),
    body('img').custom((value, { req }) => {
        let file = req.file;
        let validExtensions = ['.jpg', '.jpeg', '.png'];

        if (!file) {
            throw new Error('Debes subir una imagen');
        } else {
            let fileExtension = path.extname(file.originalname);
            if (!validExtensions.includes(fileExtension)) {

                throw new Error(`Los formatos válidos son ${validExtensions.join(', ')}`);

            }

        }

        return true;
    })
]

const userValidations = [
    body('nombre').notEmpty().withMessage("Debes escribir tu nombre"),
    body('apellido').notEmpty().withMessage("Debes escribir tu apellido"),
    body('email')
        .notEmpty().withMessage("Debes escribir tu email").bail()
        .isEmail().withMessage("Debes escribir un formato de email valido"),
    body('password').notEmpty().withMessage("Debes escribir tu contraseña"),
    body('avatar').custom((value, { req }) => {
        let file = req.file;
        if (!file) {
            throw new Error('Debes subir una imagen')
        }
        return true;
    })
]

const emailValidations = [
    body('email')
        .notEmpty().withMessage("Debes escribir tu email").bail()
        .isEmail().withMessage("Debes escribir un formato de email valido"),
    body('password').notEmpty().withMessage("Debes escribir tu contraseña")
]

module.exports = {
    productValidations,
    userValidations,
    emailValidations
}