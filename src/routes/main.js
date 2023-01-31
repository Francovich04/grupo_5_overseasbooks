const express = require('express');
const routerMain = express.Router();
const {main, database} = require('../controllers/mainControllers');
const {details, detailsById} = require('../controllers/productDetailControllers');

routerMain.get('/', main );
routerMain.get('/database', database);
routerMain.get('/details/:id', detailsById);


module.exports = routerMain;