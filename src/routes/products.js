const express = require('express');
const routerProducts = express.Router();
const { create, 
    addBook, 
    edit, 
    editConfirm, 
    deleteBook, 
    detailsById, 
    database, 
    editView } = require('../controllers/productsControllers');
const multerMiddleware = require('../middlewares/multerMiddleware');
const validations = require('../validations/allValidations');


routerProducts.get('/products/create', create);
routerProducts.post('/products/create', multerMiddleware.productsUpload.single('img'), validations.productValidations, addBook);

routerProducts.get('/products/edit/', editView)
routerProducts.get('/products/edit/:id', edit);
routerProducts.put('/products/edit/:id', multerMiddleware.productsUpload.single('img'), editConfirm);

routerProducts.delete('/products/edit/delete/:id', deleteBook)

routerProducts.get('/products/details/:id', detailsById);

routerProducts.get('/database', database);

module.exports = routerProducts;
