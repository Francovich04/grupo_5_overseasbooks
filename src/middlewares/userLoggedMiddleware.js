const User = require('../models/User')
let db = require('../database/models');

function userLoggedMiddleware(req, res, next) {
    res.locals.isLogged = false

    let emailInCookie = req.cookies.userEmail;
    let userFromCookie = User.findByField('email', emailInCookie);

    if (userFromCookie) {
        req.session.userLogged = userFromCookie
    }

    if (req.session && req.session.userLogged) {
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
        console.log(res.locals.userLogged.admin);

        // Verificamos si el usuario tiene role "admin" y lo guardamos en locals para usarlo en las vistas
        if (res.locals.userLogged.admin == "true") {
            res.locals.isAdmin = true;
        } else {
            res.locals.isAdmin = false;
        }
    }
    next()
}

module.exports = userLoggedMiddleware