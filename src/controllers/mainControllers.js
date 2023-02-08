const path = require('path');
/* const books = require('../database/libros');   */

let fs = require('fs');
/* let booksJSON = fs.readFileSync(path.join(__dirname,'../data/libros.json')); */







const main = (req, res) => {
    
    let booksJSON = fs.readFileSync(path.join(__dirname,'../data/libros.json'));
    let books = JSON.parse(booksJSON);
    
    res.render(path.join(__dirname,'../views/home.ejs'), {'allBooks': books, categories: ["Best Sellers", "Science", "Fiction"]});
}

const database = (req, res) => {
    res.send(books);
}

module.exports = {main, database};

    