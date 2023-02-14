const express = require('express');
const routerShoppingCart = express.Router();
const {shoppingCart, buy} = require('../controllers/shoppingCartControllers');
const path = require('path')
const authMiddleware = require('../middlewares/authMiddleware')

routerShoppingCart.get('/cart', authMiddleware, shoppingCart );

routerShoppingCart.get('/shoppingcart2/:id', authMiddleware, buy);

/* routerShoppingCart.get('/shoppingcart2', (req, res) => {
    res.render(path.resolve(__dirname, '../views/shoppingCart2.ejs'))
}) */

module.exports = routerShoppingCart;