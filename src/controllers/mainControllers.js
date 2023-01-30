const path = require('path');
const books = require('../database/libros');


const main = (req, res) => {
    res.render(path.join(__dirname,'../views/home.ejs'), {'allBooks': books, categories: ["Best Sellers", "Science", "Fiction"]});
}

const database = (req, res) => {
    res.send(books);
}

module.exports = {main, database};

    