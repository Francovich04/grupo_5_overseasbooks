const express = require('express');
const app = express();
const path = require('path')
const publicPath = path.resolve(__dirname, './public')

app.use(express.static(publicPath))

app.listen (3001, () => console.log ('Servidor corriendo'));

app.get('/shoppingcart', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/shoppingCart.html'))
})

app.get('/shoppingcart2', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/shoppingCart2.html'))
})

app.get('/shoppingcart3', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/shoppingCart3.html'))
})

//Public Path, in this case, __dirname is the complete route where app.js is located
//permite servir archivos estaticos desde public

//using static files, middleware

app.get('/', (req, res) => {
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
