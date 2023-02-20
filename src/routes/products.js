const express = require('express');
const routerProducts = express.Router();
const { create, 
    addBook, 
    edit, 
    editConfirm, 
    deleteBook, 
    detailsById, 
    database, 
    editView,
    shoppingCart,
    buy } = require('../controllers/productsControllers');
const multerMiddleware = require('../middlewares/multerMiddleware');
const validations = require('../validations/allValidations');
const authMiddleware = require('../middlewares/authMiddleware')


routerProducts.get('/products/create', authMiddleware,create);
routerProducts.post('/products/create', multerMiddleware.productsUpload.single('img'), validations.productValidations, addBook);

routerProducts.get('/products/edit/', authMiddleware, editView)
routerProducts.get('/products/edit/:id', authMiddleware, edit);
routerProducts.put('/products/edit/:id', multerMiddleware.productsUpload.single('img'), editConfirm);

routerProducts.delete('/products/edit/delete/:id', deleteBook)

routerProducts.get('/products/details/:id', detailsById);

routerProducts.get('/database', database);

routerProducts.get('/products/cart', authMiddleware, shoppingCart );

routerProducts.get('/products/cart/:id', authMiddleware, buy);

module.exports = routerProducts;
