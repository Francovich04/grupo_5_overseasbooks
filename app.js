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