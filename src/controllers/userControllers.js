const path = require('path');
const { validationResult } = require('express-validator')
const User = require('../models/User')
const bcryptjs = require('bcryptjs')

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

    let userinDB = User.findByField('email', req.body.email);

    if (userinDB) {
        return res.render(path.join(__dirname,'../views/register.ejs'), {
            errors: {email: {msg: 'Este email ya esta registrado'}},
            oldData: req.body
        });
    }

    let userToCreate = {
        ...req.body,
        password: bcryptjs.hashSync(req.body.password, 10),
        avatar: req.file.filename
    }
    let userCreated = User.create(userToCreate);

    return res.redirect('/user/login')
}
const processLogin = (req, res) => {
    const resultValidation = validationResult(req);
    if (resultValidation.errors.length > 0) {
        console.log(resultValidation.errors)
        return res.render(path.join(__dirname,'../views/login.ejs'), {
            errors: resultValidation.mapped(),
            oldData: req.body
        });
    }

    let userToLogin = User.findByField('email', req.body.email);
    /* return res.send(userToLogin); */


    if (userToLogin) {
        let comparePassword = bcryptjs.compareSync(req.body.password, userToLogin.password)
        if (comparePassword) {
            req.session.userLogged = userToLogin

            if (req.body.botonremember) {
                res.cookie('userEmail', req.body.email, {maxAge: (1000000 * 90) * 4})
            }

            return res.redirect('/user/profile')
        }
        return res.render(path.join(__dirname,'../views/login.ejs'), {
            errors: {password: {msg: 'La contraseña ingresada no es correcta'}},
            oldData: req.body
        });
    } else {
    res.render(path.join(__dirname,'../views/login.ejs'), {
        errors: {email: {msg: 'El email ingresado no esta registrado'}},
        oldData: req.body
    });
}
}

const userProfile = (req, res) => {
    return res.render(path.join(__dirname,'../views/userProfile.ejs'), {
        user: req.session.userLogged
    });
}

const userLogout = (req, res) =>{
    res.clearCookie('userEmail');
    req.session.destroy();
    return res.redirect('/')
}

module.exports = {login, register, passwordreset, processRegister, processLogin, userProfile, userLogout};
