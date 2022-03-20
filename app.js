const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res)=>{
    res.send("Hola mi Server en Express")
})

app.get('/nueva-ruta', (req, res)=>{
    res.send("Hola soy un nuevo enpoint")
})

app.get('/products', (req, res)=>{
    res.json({
        name: 'Producto 1',
        price: 1000
    })
})

app.listen(port, ()=>{
    console.log("Mi port " + port);
})



