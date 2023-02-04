const express = require('express');
const routerShoppingCart = express.Router();
const {shoppingCart, buy} = require('../controllers/shoppingCartControllers');
const path = require('path')

routerShoppingCart.get('/cart', shoppingCart );

routerShoppingCart.get('/shoppingcart2/:id', buy);

/* routerShoppingCart.get('/shoppingcart2', (req, res) => {
    res.render(path.resolve(__dirname, '../views/shoppingCart2.ejs'))
}) */

module.exports = routerShoppingCart;