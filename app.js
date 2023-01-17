const express = require('express'); 

const path = require('path')

const app = express();

app.listen(3000, () => {
    console.log('servidor escuchando en el puerto 3000');
})

app.use(express.static("public"))

//overseasbooks register form

app.get('/login', (req, res) => {
    const ruta = path.join(__dirname, './views/login.html');
   res.sendFile(ruta);
})
app.get('/register', (req, res) => {
    const ruta = path.join(__dirname, './views/register.html');
   res.sendFile(ruta);
})





