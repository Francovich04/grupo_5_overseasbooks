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
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');



routerProducts.get('/products/create', adminMiddleware,authMiddleware,create);
routerProducts.post('/products/create', validations.productValidations, multerMiddleware.productsUpload.single('img'), addBook);

routerProducts.get('/products/edit/', adminMiddleware,authMiddleware, editView);
routerProducts.get('/products/edit/:id', adminMiddleware,authMiddleware, edit);
routerProducts.put('/products/edit/:id',multerMiddleware.productsUpload.single('img'), editConfirm);

routerProducts.delete('/products/edit/delete/:id', adminMiddleware,deleteBook);

routerProducts.get('/products/details/:id', detailsById);

routerProducts.get('/database',adminMiddleware, database);

routerProducts.get('/products/cart', authMiddleware, shoppingCart );

routerProducts.get('/products/cart/:id', authMiddleware, buy);

module.exports = routerProducts;
