const express = require('express');
const routerMain = express.Router();
const {main, database} = require('../controllers/mainControllers');

routerMain.get('/', main );
routerMain.get('/database', database)


module.exports = routerMain;