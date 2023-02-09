const express = require('express');
const app = express();
const path = require('path')
const publicPath = path.resolve(__dirname, './public')
const morgan = require("morgan");
const routerMain = require('./src/routes/main');
const routerLoginRegister = require('./src/routes/loginRegister');
const routerShoppingCart = require('./src/routes/shoppingCart');
const routerProducts = require('./src/routes/products');
const port = process.env.PORT || 3001;
const methodOverride = require('method-override');


app.listen(port, () => console.log(`Server running in port ${port}...`));


app.use(express.static(publicPath));
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false })); 
app.use(express.json());
app.use(methodOverride('_method'));
app.use(routerMain, routerLoginRegister, routerShoppingCart, routerProducts);


app.set("view engine", "ejs");


/* app.get('/shoppingcart', (req, res) => {
    res.render(path.resolve(__dirname, './views/shoppingCart.ejs'))
}) */

/* app.get('/shoppingcart2', (req, res) => {
    res.render(path.resolve(__dirname, '../views/shoppingCart2.ejs'))
}) */

/* app.get('/shoppingcart3', (req, res) => {
    res.render(path.resolve(__dirname, './views/shoppingCart3.ejs'))
}) */

//Public Path, in this case, __dirname is the complete route where app.js is located
//permite servir archivos estaticos desde public

//using static files, middleware

/* app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/home.html'));
});

app.get('/productDetail', (req, res) => {
    res.sendFile(path.join(__dirname, "/views/productDetail.html"));
});

app.get('/login', (req, res) => {
    const ruta = path.join(__dirname, './views/login.html');
   res.sendFile(ruta);
})
app.get('/register', (req, res) => {
    const ruta = path.join(__dirname, './views/register.html');
   res.sendFile(ruta);
})
app.get('/passwordreset', (req, res) => {
    const ruta = path.join(__dirname, './views/passwordreset.html');
   res.sendFile(ruta);
}) */