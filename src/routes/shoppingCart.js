const express = require('express');
const routerShoppingCart = express.Router();
const {shoppingCart, buy} = require('../controllers/shoppingCartControllers');
const path = require('path')
const authMiddleware = require('../middlewares/authMiddleware')

routerShoppingCart.get('/cart', authMiddleware, shoppingCart );

routerShoppingCart.get('/shoppingcart2/:id', authMiddleware, buy);

module.exports = routerShoppingCart;