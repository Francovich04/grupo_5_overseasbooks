const express = require('express');
const path = require('path');
const app = express();

//Public Path, in this case, __dirname is the complete route where app.js is located
//permite servir archivos estaticos desde public
const publicPath = path.resolve(__dirname, './public');

//using static files, middleware
app.use( express.static(publicPath) );

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/home.html'));
});

app.listen(3010, () => console.log('Server running in port 3010...'));