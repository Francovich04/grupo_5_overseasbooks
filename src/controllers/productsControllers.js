const path = require('path');
/* const books = require('../database/libros'); */


let db = require('../database/models');
const Op = db.Sequelize.Op;

let fs = require('fs');

let booksJSON = fs.readFileSync(path.join(__dirname, '../data/libros.json'));

let books = JSON.parse(booksJSON);


const { validationResult } = require('express-validator');
const { mainControllers } = require('./mainControllers');

const create = (req, res) => {
    db.Category.findAll()
        .then((categories) => {
            // console.log(categories);
            return res.render(path.join(__dirname, '../views/create.ejs'), { categories })
        })
}

const addBook = (req, res) => {

    let booksJSON = fs.readFileSync(path.join(__dirname, '../data/libros.json'));

    let books = JSON.parse(booksJSON);

    const resultValidation = validationResult(req);

    /*    if (resultValidation.errors.length > 0) {
           return res.render(path.join(__dirname, '../views/create.ejs'), {
               errors: resultValidation.mapped(),
               oldData: req.body
           })
   
       } */

    if (resultValidation.errors.length > 0) {
        if (req.file) {
            fs.unlinkSync(path.join(__dirname, '../../public/images/products', req.file.filename))
        }
        return res.render(path.join(__dirname, '../views/create.ejs'), {
            errors: resultValidation.mapped(),
            oldData: req.body
        })

    }




    const {
        titleEng,
        titleEsp,
        color,
        author,
        category,
        price,
        img,
        productDetail

    } = req.body;

    const imagen = req.file ? req.file.filename : '';
    let newImage;

    if (imagen.length > 0) {

        newImage = `/images/products/${imagen}`
    }

    const newId = books[books.length - 1].id + 1;

    const obj = {
        id: newId,
        titleEng,
        titleEsp,
        color,
        author,
        category,
        price,
        img: newImage,
        productDetail
    }

    books.push(obj);

    booksJSON = JSON.stringify(books);

    fs.writeFileSync(path.join(__dirname, '../data/libros.json'), booksJSON);


    res.redirect('/')
}

const edit = (req, res) => {

    const { id } = req.params;
    const edit = books.find(e => e.id == id);
    /* if (!edit)res.send("NO EDIT"); */
    res.render(path.join(__dirname, '../views/edit.ejs'), { edit });



}

const editConfirm = (req, res) => {

    let booksJSON = fs.readFileSync(path.join(__dirname, '../data/libros.json'));

    let books = JSON.parse(booksJSON);

    const imagen = req.file ? req.file.filename : '';
    let newImage;

    books.forEach(e => {
        if (e.id == req.params.id) {
            e.titleEng = req.body.titleEng;
            e.titleEsp = req.body.titleEsp;
            e.color = req.body.color;
            e.author = req.body.author;
            e.category = req.body.category;
            e.price = req.body.price;
            e.productDetail = req.body.productDetail;
            if (imagen.length > 0) {
                newImage = `/images/products/${imagen}`
                e.img = newImage;
            }
        }
    })

    booksJSON = JSON.stringify(books);

    fs.writeFileSync(path.join(__dirname, '../data/libros.json'), booksJSON)

    res.redirect('/');

};

const deleteBook = (req, res) => {

    let booksJSON = fs.readFileSync(path.join(__dirname, '../data/libros.json'));

    let books = JSON.parse(booksJSON);

    const idEliminar = req.params.id;

    books = books.filter((book) => book.id != idEliminar)

    booksJSON = JSON.stringify(books);

    fs.writeFileSync(path.join(__dirname, '../data/libros.json'), booksJSON);


    //cuando se elimina uno, pasa a faltar un ID, entonces create/"id que elimine" da error.

    res.redirect('/');

}

const detailsById = (req, res) => {
    let booksJSON = fs.readFileSync(path.join(__dirname, '../data/libros.json'));

    let books = JSON.parse(booksJSON);
    let idBook = req.params.id;
    const detailBook = books.find(book => book.id == idBook)
    const filterBooks = books.filter((book) => {
        return book.category == detailBook.category && book.id != detailBook.id;
    });
    res.render(path.join(__dirname, '../views/productDetail'), { allBooks: filterBooks, book: detailBook });
};

const database = (req, res) => {
    let booksJSON = fs.readFileSync(path.join(__dirname, '../data/libros.json'));
    let books = JSON.parse(booksJSON);
    res.send(books);
}

const editView = (req, res) => {

    let booksJSON = fs.readFileSync(path.join(__dirname, '../data/libros.json'));
    let books = JSON.parse(booksJSON);

    res.render(path.join(__dirname, '../views/editView.ejs'), { 'allBooks': books, categories: ["Best Sellers", "Science", "Fiction"] });

}

const shoppingCart = (req, res) => {
    res.render(path.join(__dirname, '../views/shoppingCart3.ejs'));
}

const buy = (req, res) => {

    const { id } = req.params;


    db.Book.findByPk(id)
        .then((buy) => {
            res.render(path.join(__dirname, '../views/shoppingCart2.ejs'), { buy });
        })
}



// CRUD SEQUELIZE

let productsControllers = {

    // Vista Product Detail

    detailCompleto: (req, res) => {
        let idBook = req.params.id;
        db.Book.findAll(
            {
                include: [
                    { association: "categories" },
                    { association: "authors" }
                ],

                order: [
                    ['id', "DESC"]
                ],
                // limit : 100
            }
        )
            .then(function (books) {
                res.render(path.join(__dirname, '../views/productDetail'), { books, idBook });
            })
    },

    // CORREGIR NO FUNCIONA
    search: (req, res) => {
        const {search} = req.body;
        // console.log(search, 'soy query');

        db.Book.findAll({
            include: [
                { association: "categories" },
                { association: "authors" }
            ],
            where: {
                title: { [Op.like]: `%${search}%` }
            },
            raw: true
        }).then(function (books) {
            // console.log(books);
            res.render(path.join(__dirname, '../views/searchBook'), { books, categories: ['Best Sellers', 'Fiction', 'Science'] })

        });
    },


    // CREATE SEQUELIZE

    createBookSeq: (req, res) => {

        const resultValidation = validationResult(req);

        if (resultValidation.isEmpty()) {
            // Acá hacemos código de acceso a base de datos
            Promise.all([
                db.Author.findOrCreate({
                    where: { name: req.body.author },
                }),
                db.Category.findOrCreate({ where: { category: req.body.category } }),
                

            ])
                .then(([authors, categories]) => {

                    db.Book.create({
                        title: req.body.titleEsp,
                        category_id: categories[0].id,
                        author_id: authors[0].id,
                        price: req.body.price,
                        img: req.file ? req.file.filename : '',
                        description: req.body.productDetail,
                        color: req.body.color
                    });
                })
                .then((book) => {
                    return res.redirect('/');
                    // return res.json({ message: 'Artículo creado con éxito' });
                })
                .catch((error) => {
                    // console.log(error);
                    res.status(500).json({ error: 'Error al crear libro' });
    
                });

        } else {
            // Acá devolvemos los errores
            res.render(path.join(__dirname, '../views/create.ejs'), {
                errors: resultValidation.mapped(),
                oldData: req.body
            })
        }

    },


    // Vista de edición múltiple

    editViewSeq: (req, res) => {
        db.Book.findAll(
            {
                include: [
                    { association: "categories" },
                    { association: "authors" }
                ],

                order: [
                    ['id', "DESC"]
                ],
                // limit : 100
            }
        )

            .then((books) => {

                const allBooks = books.map(book => {
                    return {
                        id: book.id,
                        titleEsp: book.title,
                        color: book.color,
                        img: book.img,
                        description: book.description,
                        price: book.price,
                        author: book.authors.name,
                        category: book.categories.category,
                        stock: book.stock
                    }
                })

                res.render(path.join(__dirname, '../views/editView'), { 'allBooks': allBooks, categories: ["Best Sellers", "Science", "Fiction"] });
            })
    }
    ,

    // Vista de edición individual

    editBookSeq: (req, res) => {
        db.Book.findByPk((req.params.id), {
            include: [
                { association: "categories" },
                { association: "authors" }
            ]
        })
            .then(function (edit) {
                // console.log(edit);
                res.render(path.join(__dirname, '../views/edit'), { edit: edit });
            })
    },

    // UPDATE SEQUELIZE

    updateBookSeq: (req, res) => {

        let { id } = req.params;

        Promise.all([
            db.Author.findOne({
                where: { name: req.body.author },
            }),
            db.Category.findOne({ where: { category: req.body.category } })

        ])
            .then(([authors, categories]) => {

                db.Book.update({
                    title: req.body.titleEsp,
                    category_id: categories.id,
                    author_id: authors.id,
                    price: req.body.price,
                    img: req.file ? req.file.filename : '',
                    description: req.body.description,
                    stock: req.body.stock
                },
                    {
                        where: { id: req.params.id }
                    })
                    .then((book) => {
                        return res.redirect("/")
                    })
                    .catch((error) => {
                        // console.log(error);
                        return res.status(500).json({ error: 'Error al editar libro' });
                    })

            })
    },

    // DELETE SEQUELIZE
    deleteBookSeq: (req, res) => {
        db.Book.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(resultado => {
                return res.redirect('/')
                // res.redirect('/');
            })
            .catch(error => {
                // console.error(error);
                return res.status(500).json({ message: 'Internal server error' });
            })
    }
};

// API ENDPOINTS

let apiEndpoints = {
    // Listado de productos
    listProducts : (req, res) => {
        db.Book.findAll()
            .then( books => {
                return res.status(200).json({
                    count : books.length,
                    countByCategory : {} ,
                    data : books,
                    status : 200
                })
            })
    },

    // Product detail
    listProductDetail : (req, res) => {
        db.Book.findByPk(req.params.id)
            .then( book => {
                return res.status(200).json({
                    data : book,
                    status : 200
                })
            })
    },

    // Product Search
    productSearch : (req, res) => {
        db.Book.findAll({
            where : {
                title : {
                    [Op.like] : '%' + req.query.keyword + '%'
                }
            }
        })
        .then(books => {
            if (books.length === 0) {
                return res.status(404).json({ message: "No se encontraron libros con ese título" });
            }
            
            return res.status(200).json(books);
        })
        .catch(error => {
            console.error("Error en la búsqueda de productos:", error);
            return res.status(500).json({ message: "Error en el servidor" });
        });
    }
    
    
    
    
    
    

};



module.exports = {
    create,
    addBook,
    edit,
    editConfirm,
    deleteBook,
    detailsById,
    database,
    editView,
    shoppingCart,
    buy,
    productsControllers,
    apiEndpoints
};