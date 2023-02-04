const express = require('express');
const routerCreate = express.Router();
const {create, addBook, edit, editConfirm, deleteBook} = require('../controllers/createControllers');
const multer = require('multer');
const path = require('path');

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

routerCreate.get('/create', create);
routerCreate.post('/create', upload.single('img'), addBook);

routerCreate.get('/edit/:id', edit);
routerCreate.put('/edit/', upload.single('img'), editConfirm);

routerCreate.delete('/edit/delete/:id', deleteBook)

module.exports = routerCreate;