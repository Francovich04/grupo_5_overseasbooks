const express = require('express');
const routerMain = express.Router();
const {main} = require('../controllers/mainControllers');

routerMain.get('/', main );


module.exports = routerMain;