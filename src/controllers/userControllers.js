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

    let userinDB = db.User.findByField('email', req.body.email);

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
        // console.log(resultValidation.errors)
        return res.render(path.join(__dirname, '../views/login.ejs'), {
            errors: resultValidation.mapped(),
            oldData: req.body
        });
    }

    db.User.findOne({
        where: { email: req.body.email },
    })
    .then((user) => {
        // console.log(user.dataValues)
        if (user.dataValues) {
            let comparePassword = bcryptjs.compareSync(req.body.password, user.dataValues.password)
            if (comparePassword) {
                req.session.userLogged = user.dataValues
    
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
    })
    
    /* return res.send(userToLogin); */


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
            db.User.findAll({
                where: { email: req.body.email }
            })
                .then((users) => {

                    // En caso de existir email registrado, se rechaza la promesa
                    if (users.length > 0) {
                        return Promise.reject('El email ya está registrado');
                    } else {
                        return db.User.create({
                            first_name: req.body.nombre,
                            last_name: req.body.apellido,
                            email: req.body.email,
                            password: bcryptjs.hashSync(req.body.password, 10),
                            avatar: req.file.filename
                        });
                    }
                })
                .then((user) => {
                    return res.redirect('/');
                    // return res.json({ message: 'Artículo creado con éxito' });
                })
                .catch((error) => {
                    res.render(path.join(__dirname, '../views/register.ejs'), {
                        errors: { email: { msg: 'Este email ya está registrado' } },
                        oldData: req.body,
                    });
                });
        } else {
            // Acá devolvemos los errores
            res.render(path.join(__dirname, '../views/register.ejs'), {
                errors: resultValidation.mapped(),
                oldData: req.body
            })
        }
        return res.redirect('/user/login')
    },
    // DELETE USER SEQUELIZE
    /* Se debe utilizar con Postman */

    deleteUserSeq: (req, res) => {
        db.User.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(resultado => {
                return res.status(200).json({ message: 'Usuario eliminado con éxito' });
                // return res.redirect('/')
            })
            .catch(error => {
                // console.error(error);
                return res.status(500).json({ message: 'Internal server error' });
            })
    },

    // Listado de users
    listUsersAPI: (req, res) => {
        db.User.findAll({
            attributes: { exclude: ['password'] } // Excluir el atributo 'password'
        }
        )
            .then(users => {
                return res.status(200).json({
                    count: users.length,
                    countByCategory: {},
                    data: users,
                    status: 200
                })
            })
    },

    // User details
    listUserDetailAPI: (req, res) => {
        db.User.findByPk(req.params.id, {
            attributes: { exclude: ['password'] } // Excluir el atributo 'password'
        })
            .then(user => {
                return res.status(200).json({
                    data: user,
                    status: 200
                })
            })
    },

    // User search

    userSearchAPI: (req, res) => {
        const { search } = req.query;
        // console.log(search, 'soy query');

        db.User.findAll({
            where: {
                [Op.or]: [
                    { first_name: { [Op.like]: `%${search}%` } },
                    { last_name: { [Op.like]: `%${search}%` } }
                ]
            },
            attributes: { exclude: ['password'] } // Excluir el atributo 'password'

        }).then(function (users) {
            if (users.length == 0) {
                // No se encontraron usuarios con ese nombre
                return res.status(404).json({ message: "No se encontraron usuarios con ese nombre" });
            }
            // Se encontraron usuarios con ese nombre
            return res.status(200).json(users);
        }).catch(error => {
            console.error("Error en la búsqueda de usuarios:", error);
            return res.status(500).json({ message: "Error en el servidor" });
        });

    }



}





    ;

module.exports = { login, register, passwordreset, processRegister, processLogin, userProfile, userLogout, userControllers };
