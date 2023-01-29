const express = require('express');
const routerCreate = express.Router();
const {create, addBook, edit, editConfirm} = require('../controllers/createControllers');


routerCreate.get('/create', create);
routerCreate.post('/create', addBook);

routerCreate.get('/edit/:id', edit);
routerCreate.put('/edit/', editConfirm);


module.exports = routerCreate;