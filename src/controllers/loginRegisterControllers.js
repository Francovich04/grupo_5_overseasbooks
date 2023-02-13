const path = require('path');
const { validationResult }= require('express-validator')

const login = (req, res) => {
    res.render(path.join(__dirname,'../views/login.ejs'));
}
const register = (req, res) => {
    res.render(path.join(__dirname,'../views/register.ejs'));
}
const passwordreset= (req, res) => {
    res.render(path.join(__dirname,'../views/passwordreset.ejs'));
}
const processRegister = (req, res) => {
    const resultValidation = validationResult(req);
    if (resultValidation.errors.length > 0) {
        return res.render(path.join(__dirname,'../views/register.ejs'), {
            errors: resultValidation.mapped(),
            oldData: req.body
        });
    }
}
const processLogin = (req, res) => {
    const resultValidation = validationResult(req);
    if (resultValidation.errors.length > 0) {
        return res.render(path.join(__dirname,'../views/login.ejs'), {
            errors: resultValidation.mapped(),
            oldData: req.body
        });
    }
}


module.exports = {login, register, passwordreset, processRegister, processLogin};
