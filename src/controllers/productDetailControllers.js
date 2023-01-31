const path = require('path');
const books = require('../database/libros');

const details = (req, res) => {
    res.render(path.join(__dirname,'../views/productDetail.ejs'));
};
const detailsById = (req, res) => {
        let idBook = req.params.id;
        const detailBook = books.find(book => book.id == idBook)
        const filterBooks = books.filter((book) => {
            return book.category == detailBook.category && book.id != detailBook.id;
        }) ;
        res.render(path.join(__dirname, '../views/productDetail'), { allBooks: filterBooks, book : detailBook});
};


module.exports = {details, detailsById};