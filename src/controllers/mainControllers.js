const path = require('path');
/* const books = require('../database/libros');   */

let fs = require('fs');
/* let booksJSON = fs.readFileSync(path.join(__dirname,'../data/libros.json')); */


let db = require('../../grupo_5_overseasbooks/models');
const Op = db.Sequelize.Op;


let mainControllers = {
    listAuthors: (req, res) => {
        db.Author.findAll(
            {
                order: [
                    ['id', "DESC"]
                ],
                // limit : 100
            }
        )
            .then(function (autores) {
                res.render(path.join(__dirname, '../views/vistaPruebaAutores'), { autores: autores });
            })
    },

    listBooks : (req, res) => {
        db.Book.findAll(
            {
                include: [
                    {association: "categories"},
                    {association: "authors"}
                    ],

                order: [
                    ['id', "DESC"]
                ],
                // limit : 100
            }
        )
            .then(function (books) {
                res.render(path.join(__dirname, '../views/vistaPruebaAutores'), { books });
            })
    },

    listCategories : (req, res) => {
        db.Category.findAll(
            {
                order: [
                    ['id', "DESC"]
                ]
                // limit : 100
            }
        )
            .then(function (categories) {
                res.render(path.join(__dirname, '../views/vistaPruebaAutores'), { categories });
            })
        },

        listUsers : (req, res) => {
            db.User.findAll(
                {
                    order: [
                        ['id', "DESC"]
                    ]
                    // limit : 100
                }
            )
                .then(function (users) {
                    res.render(path.join(__dirname, '../views/vistaPruebaAutores'), { users });
                })
            },
    
};


const main = (req, res) => {
    
    let booksJSON = fs.readFileSync(path.join(__dirname,'../data/libros.json'));
    let books = JSON.parse(booksJSON);
    
    res.render(path.join(__dirname,'../views/home.ejs'), {
        'allBooks': books, 
        categories: ["Best Sellers", "Science", "Fiction",]
    });
}


module.exports = {main, mainControllers};

    