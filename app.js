const express = require('express');
const app = express();
const path = require('path')
const publicPath = path.resolve(__dirname, './public')
const morgan = require("morgan");
const routerMain = require('./src/routes/main');
const routerLoginRegister = require('./src/routes/users');
const routerProducts = require('./src/routes/products');
const port = process.env.PORT || 3020;
const methodOverride = require('method-override');
const session = require('express-session')
const userLoggedMiddleware = require('./src/middlewares/userLoggedMiddleware')
const cookies = require('cookie-parser')


app.listen(port, () => console.log(`Server running in port ${port}...`));

app.use(session({
    secret: "It's a secret",
    resave: false,
    saveUninitialized: false
}))
app.use(cookies());
app.use(express.static(publicPath));
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false })); 
app.use(express.json());
app.use(methodOverride('_method'));
app.use(userLoggedMiddleware)
app.use(routerMain, routerLoginRegister, routerProducts);


app.set("view engine", "ejs");