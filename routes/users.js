const express = require('express');
const faker = require('faker')

const router = express.Router();

// Parametros con Query 
router.get('/', (req, res) =>{
    const users = []
    const {limit, offset, size} = req.query;

    if (limit && offset){
        res.json({
            limit,
            offset
        })
    }else{
        const limit = size || 10;

        for (let i = 0; i < limit; i++) {
            users.push({
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                jobTitle: faker.name.jobTitle(),
            })
        }

        res.json(users)
    }
})


module.exports = router;