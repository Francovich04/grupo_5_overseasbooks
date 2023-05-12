const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const bcryptjs = require('bcryptjs');
let db = require('../database/models');
const Op = db.Sequelize.Op;


const login = (req, res) => {
    res.render(path.join(__dirname, '../views/login.ejs'));
}
const register = (req, res) => {
    res.render(path.join(__dirname, '../views/register.ejs'));
}
const passwordreset = (req, res) => {
    res.render(path.join(__dirname, '../views/passwordreset.ejs'));
}
const processRegister = (req, res) => {
    const resultValidation = validationResult(req);
    if (resultValidation.errors.length > 0) {
        if (req.file) {
            fs.unlinkSync(path.join(__dirname, '../../public/images/avatars', req.file.filename))
        }
        return res.render(path.join(__dirname, '../views/register.ejs'), {
            errors: resultValidation.mapped(),
            oldData: req.body
        });
    }




    let userinDB = User.findByField('email', req.body.email);

    if (userinDB) {
        return res.render(path.join(__dirname, '../views/register.ejs'), {
            errors: { email: { msg: 'Este email ya esta registrado' } },
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
        return res.render(path.join(__dirname, '../views/login.ejs'), {
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
                res.cookie('userEmail', req.body.email, { maxAge: (1000000 * 90) * 4 })
            }

            return res.redirect('/user/profile')
        }
        return res.render(path.join(__dirname, '../views/login.ejs'), {
            errors: { password: { msg: 'La contraseña ingresada no es correcta' } },
            oldData: req.body
        });
    } else {
        res.render(path.join(__dirname, '../views/login.ejs'), {
            errors: { email: { msg: 'El email ingresado no esta registrado' } },
            oldData: req.body
        });
    }
}

const userProfile = (req, res) => {
    return res.render(path.join(__dirname, '../views/userProfile.ejs'), {
        user: req.session.userLogged
    });
}

const userLogout = (req, res) => {
    res.clearCookie('userEmail');
    req.session.destroy();
    return res.redirect('/')
}


// CRUD SEQUELIZE USERS

let userControllers = {

    // CREATE SEQUELIZE

    createUserSeq: (req, res) => {

        const resultValidation = validationResult(req);
        if (resultValidation.isEmpty()) {
            db.User.findOrCreate({
                where: { email: req.body.email },
            })
                .then((users) => {
                    // console.log(authors[0]);
    
                    db.User.create({
                        first_name: req.body.nombre,
                        last_name: req.body.apellido,
                        email: req.body.email,
                        password: bcryptjs.hashSync(req.body.password, 10),
                        avatar: req.file.filename

                    });
                })
                .then((user) => {
                    return res.redirect('/');
                    // return res.json({ message: 'Artículo creado con éxito' });
                })
                .catch((error) => {
                    // console.log(error);
                    res.status(500).json({ error: 'Error al crear libro' });
                });
        } else {
            // Acá devolvemos los errores
            res.render(path.join(__dirname, '../views/register.ejs'), {
                errors: resultValidation.mapped(),
                oldData: req.body
            })
        }

        // Lógica de registración

        let userinDB = db.User.findAll({where : { email : req.body.email }});

    if (userinDB) {
        return res.render(path.join(__dirname, '../views/register.ejs'), {
            errors: { email: { msg: 'Este email ya esta registrado' } },
            oldData: req.body
        });
    }

    let userToCreate = {

        first_name: req.body.nombre,
        last_name: req.body.apellido,
        email: req.body.email,
        password: bcryptjs.hashSync(req.body.password, 10),
        avatar: req.file.filename
    }
    let userCreated = db.User.create(userToCreate);

    return res.redirect('/user/login')
}


}





;

module.exports = { login, register, passwordreset, processRegister, processLogin, userProfile, userLogout, userControllers };
