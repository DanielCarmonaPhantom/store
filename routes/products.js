
const express = require('express');
const ProductsService = require('./../services/products')

const router = express.Router();
const service = new ProductsService();


router.get('/', (req, res)=>{    
    const products = service.find()
    res.json(products)
})

// Caso de Uso
/// Los endpointds que son especificos deben de ir antes de los dinamicos
///
router.get('/filter', (req, res) =>{
    res.send("Yo soy un filter")
})

router.get('/:id', (req, res) =>{
    const {id} = req.params;
    const product = service.findOne(id);
    
    res.status(200).json(product)
})

router.post('/', (req, res)=>{
    const body = req.body;
    res.status(201).json({
        message: 'created',
        data: body
    })
})

// Metodo para actualizar el producto

router.patch('/:id', (req, res)=>{
    const { id } = req.params;
    const body = req.body;

    res.json({
        message: 'update',
        data: body,
        id
    })
})

router.delete('/:id', (req, res)=>{
    const { id } = req.params;

    res.json({
        message: 'Deleted',
        id
    })
})

module.exports = router;