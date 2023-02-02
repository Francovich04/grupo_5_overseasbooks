const path = require('path');

const login = (req, res) => {
    res.render(path.join(__dirname,'../views/login.ejs'));
}
const register = (req, res) => {
    res.render(path.join(__dirname,'../views/register.ejs'));
}
const passwordreset= (req, res) => {
    res.render(path.join(__dirname,'../views/passwordreset.ejs'));
}


module.exports = {login, register,passwordreset};
