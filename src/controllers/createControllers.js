const path = require('path');
const books = require('../database/libros');
const { validationResult } = require('express-validator');

const create = (req, res) => {
    res.render(path.join(__dirname, '../views/create.ejs'));
}

const addBook = (req, res) => {

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

    res.redirect('/')
}

const edit = (req, res) => {

    const { id } = req.params;
    const edit = books.find(e => e.id == id);
    /* if (!edit)res.send("NO EDIT"); */
    res.render(path.join(__dirname, '../views/edit.ejs'), { edit });



}

const editConfirm = (req, res) => {

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
    const idEliminar = req.params.id;
    let exists = false
    for (var i = 0; i < books.length; i++) {
        if (books[i].id == idEliminar) {
            books.splice(i, 1);
            exists = true;
            break;
        }
    }
    if (!exists) res.send("NO DELETE")


    //cuando se elimina uno, pasa a faltar un ID, entonces create/"id que elimine" da error.

    res.redirect('/');

}





module.exports = {
    create,
    addBook,
    edit,
    editConfirm,
    deleteBook
};