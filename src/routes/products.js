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
    buy,
    productsControllers,
    apiEndpoints
 } = require('../controllers/productsControllers');
const multerMiddleware = require('../middlewares/multerMiddleware');
const validations = require('../validations/allValidations');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const { mainControllers } = require('../controllers/mainControllers');


// Saco middlewares para probar ruta get de "create" productos (adminMiddleware,authMiddleware)
routerProducts.get('/products/create',create);
routerProducts.post('/products/create',multerMiddleware.productsUpload.single('img'), validations.productValidations,productsControllers.createBookSeq);
routerProducts.post('/products/search',productsControllers.search);


routerProducts.get('/products/edit/', /*adminMiddleware,authMiddleware,*/ productsControllers.editViewSeq);

routerProducts.get('/products/edit/:id', /*adminMiddleware,authMiddleware,*/ productsControllers.editBookSeq);
routerProducts.post('/products/edit/:id',multerMiddleware.productsUpload.single('img'), productsControllers.updateBookSeq);
// adminMiddleware poner middleware linea de abajo
routerProducts.delete('/products/edit/delete/:id', productsControllers.deleteBookSeq);

routerProducts.get('/products/details/:id', productsControllers.detailCompleto);

routerProducts.get('/database',adminMiddleware, database);

routerProducts.get('/products/cart', authMiddleware, shoppingCart );

routerProducts.get('/products/cart/:id', authMiddleware, buy);

// Endpoints API
routerProducts.get('/api/products',apiEndpoints.listProducts);



module.exports = routerProducts;
