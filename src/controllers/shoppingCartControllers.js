const path = require('path');
const books = require('../database/libros');

const shoppingCart = (req, res) => {
    res.render(path.join(__dirname,'../views/shoppingCart3.ejs'));
}

const buy = (req,res) => {

    const {id} = req.params;
    const buy = books.find ( e => e.id == id);
    res.render(path.join(__dirname,'../views/shoppingCart2.ejs'), {buy});
    
}

module.exports = {shoppingCart, buy};