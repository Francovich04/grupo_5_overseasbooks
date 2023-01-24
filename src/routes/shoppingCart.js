const express = require('express');
const routerShoppingCart = express.Router();
const {shoppingCart} = require('../controllers/shoppingCartControllers');


routerShoppingCart.get('/cart', shoppingCart );


module.exports = routerShoppingCart;