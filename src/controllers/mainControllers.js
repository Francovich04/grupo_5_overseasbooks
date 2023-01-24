const path = require('path');
const libros = require('../database/libros');


const main = (req, res) => {
    res.render(path.join(__dirname,'../views/home.ejs'));
}


module.exports = {main};