const express = require('express');
const routerCreate = express.Router();
const {create, addBook, edit, editConfirm, deleteBook} = require('../controllers/createControllers');
const multer = require('multer');
const path = require('path');

const { body } = require('express-validator');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/images/products'))
    },
    filename: (req, file, cb) => {
        const newFile = `product-${Date.now()}_img${path.extname(file.originalname)}`
        cb(null, newFile)
    }
});

const upload = multer({storage});

const validations = [
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


routerCreate.get('/create', create);
routerCreate.post('/create', upload.single('img'), validations, addBook);

routerCreate.get('/edit/:id', edit);
routerCreate.put('/edit/', upload.single('img'), editConfirm);

routerCreate.delete('/edit/delete/:id', deleteBook)

module.exports = routerCreate;