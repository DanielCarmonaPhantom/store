const faker = require('faker')
const boom = require('@hapi/boom');

const pool = require('../libs/postgres.pool')

class ProductsService{

    constructor(){
        this.products = [];
        this.generate();
        this.pool = pool;
        this.pool.on('error', (err) =>{console.log(err)})
    }

    generate(){
        const limit = 100;

        for (let i = 0; i < limit; i++) {
            this.products.push({
                id: faker.datatype.uuid(),
                name: faker.commerce.productName(),
                price: parseInt(faker.commerce.price(),10),
                image: faker.image.imageUrl(),
                isBlock: faker.datatype.boolean(),
            });
        }
    }

    async create(data){
        const { name, price, image } = data;
        const newProduct = {
            id: faker.datatype.uuid(),
            name,
            price,
            image
        };

        this.products.push(newProduct);
        return newProduct;
    }

    async find(){
        const query = 'SELECT * FROM task';
        const rta = await this.pool.query(query)
        return rta.rows;
    }

    async findOne(id){
        // const name = this.getTotal();
        const product = this.products.find(item => item.id === id);
        if (!product) {
            throw boom.notFound("product no found");
        }
        if (product.isBlock) {
            throw boom.conflict("product is block");
        }
        return product
        
    }


    async update(id, changes){
        const index = this.products.findIndex(item => item.id === id);
        if (index === -1) {
            throw boom.notFound("product no found");
        }
        const product = this.products[index];
        this.products[index] = {
            ...product,
            ...changes
        }
        return this.products[index];       
    }

    async delete(id){
        const index = this.products.findIndex(item => item.id === id);
        if (index === -1) {
            throw boom.notFound("product no found");
        }
        this.products.splice(index,1);
        return {
            message: true,
            id
        }           
    }
}

module.exports = ProductsService;