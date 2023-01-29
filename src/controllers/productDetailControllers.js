const path = require('path');

const details = (req, res) => {
    res.render(path.join(__dirname,'../views/productDetails.ejs'));
}


module.exports = {details};