const User = require('../models/User')

function adminMiddleware (req, res, next) {

    res.locals.isAdmin = false

    let userAdmin = User.findByField('admin', true);

    if (userAdmin == req.session.userLogged) {
        res.locals.isAdmin = true
        console.log(userAdmin);
    } else {
        console.log('este usuario no es admin')
    }
    next()
}

module.exports = adminMiddleware;