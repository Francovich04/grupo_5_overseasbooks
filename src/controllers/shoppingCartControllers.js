const path = require('path');

const shoppingCart = (req, res) => {
    res.render(path.join(__dirname,'../views/shoppingCart3.ejs'));
}


module.exports = {shoppingCart};