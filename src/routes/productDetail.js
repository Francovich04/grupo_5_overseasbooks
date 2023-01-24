const express = require('express');
const routerProductDetail = express.Router();
const {details} = require('../controllers/productDetailControllers');


routerProductDetail.get('/details', details );


module.exports = routerProductDetail;