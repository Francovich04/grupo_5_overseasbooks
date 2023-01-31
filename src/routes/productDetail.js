const express = require('express');
const routerProductDetail = express.Router();
const {details, detailsById} = require('../controllers/productDetailControllers');


routerProductDetail.get('/details', details );
routerProductDetail.get('/details/:id', detailsById);

module.exports = routerProductDetail;