const express = require('express');
const routerProducts = express.Router();
const { create, addBook, edit, editConfirm, deleteBook, detailsById, database } = require('../controllers/productsControllers');
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

const upload = multer({ storage });

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


routerProducts.get('/products/create', create);
routerProducts.post('/products/create', upload.single('img'), validations, addBook);

routerProducts.get('/products/edit/:id', edit);
routerProducts.put('/products/edit/', upload.single('img'), editConfirm);

routerProducts.delete('/products/edit/delete/:id', deleteBook)

routerProducts.get('/products/details/:id', detailsById);

routerProducts.get('/database', database);

module.exports = routerProducts;