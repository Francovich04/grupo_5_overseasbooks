const path = require('path');
/* const books = require('../database/libros'); */

let fs = require('fs');

let booksJSON = fs.readFileSync(path.join(__dirname,'../data/libros.json'));

let books = JSON.parse(booksJSON);


const { validationResult } = require('express-validator');

const create = (req, res) => {
    res.render(path.join(__dirname, '../views/create.ejs'));
}

const addBook = (req, res) => {

    let booksJSON = fs.readFileSync(path.join(__dirname,'../data/libros.json'));

let books = JSON.parse(booksJSON);

    const resultValidation = validationResult(req);

    if (resultValidation.errors.length > 0) {
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

        newImage = `images/products/${imagen}`
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

    fs.writeFileSync(path.join(__dirname,'../data/libros.json'), booksJSON);


    res.redirect('/')
}

const edit = (req, res) => {

    const { id } = req.params;
    const edit = books.find(e => e.id == id);
    /* if (!edit)res.send("NO EDIT"); */
    res.render(path.join(__dirname, '../views/edit.ejs'), { edit });



}

const editConfirm = (req, res) => {

    let booksJSON = fs.readFileSync(path.join(__dirname,'../data/libros.json'));

let books = JSON.parse(booksJSON);

    const imagen = req.file ? req.file.filename : '';
    let newImage;

    books.forEach(e => {
        if (e.id == req.body.id) {
            e.titleEng = req.body.titleEng;
            e.titleEsp = req.body.titleEsp;
            e.color = req.body.color;
            e.author = req.body.author;
            e.category = req.body.category;
            e.price = req.body.price;
            e.productDetail = req.body.productDetail;
            if (imagen.length > 0) {
                newImage = `images/products/${imagen}`
                e.img = newImage;
            }
        }
    })

    res.redirect('/');

};

const deleteBook = (req, res) => {

    let booksJSON = fs.readFileSync(path.join(__dirname,'../data/libros.json'));

    let books = JSON.parse(booksJSON);

    const idEliminar = req.params.id;

    books = books.filter((book) => book.id !=idEliminar)

    booksJSON = JSON.stringify(books);

    fs.writeFileSync(path.join(__dirname,'../data/libros.json'), booksJSON);


    //cuando se elimina uno, pasa a faltar un ID, entonces create/"id que elimine" da error.

    res.redirect('/');

}

const detailsById = (req, res) => {
    let booksJSON = fs.readFileSync(path.join(__dirname,'../data/libros.json'));

let books = JSON.parse(booksJSON);
    let idBook = req.params.id;
    const detailBook = books.find(book => book.id == idBook)
    const filterBooks = books.filter((book) => {
        return book.category == detailBook.category && book.id != detailBook.id;
    }) ;
    res.render(path.join(__dirname, '../views/productDetail'), { allBooks: filterBooks, book : detailBook});
};

const database = (req, res) => {
    let booksJSON = fs.readFileSync(path.join(__dirname,'../data/libros.json'));
    let books = JSON.parse(booksJSON);
    res.send(books);
}



module.exports = {
    create,
    addBook,
    edit,
    editConfirm,
    deleteBook,
    detailsById,
    database
};