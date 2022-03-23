
const express = require('express');
const ProductsService = require('./../services/products')

const router = express.Router();
const service = new ProductsService();


router.get('/', async (req, res)=>{    
    const products = await service.find()
    res.json(products)
})

// Caso de Uso
/// Los endpointds que son especificos deben de ir antes de los dinamicos
///
router.get('/filter', async (req, res) =>{
    res.send("Yo soy un filter")
})

router.get('/:id', async (req, res) =>{
    try {
        const {id} = req.params;
        const product = await service.findOne(id);
        
        res.status(200).json(product)
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
    
})

router.post('/', async (req, res)=>{
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct)
    
})

// Metodo para actualizar el producto
router.patch('/:id', async (req, res)=>{
    const { id } = req.params;
    const body = req.body;
    const product = await service.update(id, body)    
    res.status(200).json(product)
})

router.delete('/:id', async (req, res)=>{
    const { id } = req.params;
    const rta = await service.delete(id)
    res.status(200).json(rta)
    
})

module.exports = router;