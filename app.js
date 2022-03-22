const express = require('express');
const faker = require('faker')

const app = express();
const port = 3000;

app.get('/', (req, res)=>{
    res.send("Hola mi Server en Express")
})

app.get('/nueva-ruta', (req, res)=>{
    res.send("Hola soy un nuevo enpoint")
})

app.get('/products', (req, res)=>{
    const products = []
    const { size } = req.query;

    const limit = size || 10;

    for (let i = 0; i < limit; i++) {
        products.push({
            name: faker.commerce.productName(),
            price: parseInt(faker.commerce.price(),10),
            image: faker.image.imageUrl()
        })
    }

    res.json(products)
})

// Caso de Uso
/// Los endpointds que son especificos deben de ir antes de los dinamicos
///
app.get('/products/filter', (req, res) =>{
    res.send("Yo soy un filter")
})

app.get('/products/:id', (req, res) =>{
    const {id} = req.params;
    res.json({
        id,
        name: "Product 2",
        price: 2000
    });
})

// Parametros con Query 
app.get('/users', (req, res) =>{
    const {limit, offset} = req.query;

    if (limit && offset){
        res.json({
            limit,
            offset
        })
    }else{
        res.send("No hay parametros")
    }
})

app.get('/categories/:categoryId/products/:productId', (req, res)=>{
    const {categoryId, productId} = req.params;
    res.json({
        categoryId,
        productId, 
    });
})

app.listen(port, ()=>{
    console.log("Mi port " + port);
})



