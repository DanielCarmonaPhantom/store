const express = require('express');
const cors = require('cors')

const routerApi = require('./routes')


const { logErrors, errorHandler , boomErrorHandler} = require('./middlewares/error.handler')

const app = express();
const port = 3000;

const whitelist = ['http://localhost:5500'];
const options ={
    origin: (origin, callback)=>{
        if (whitelist.includes(origin)) {
            callback(null, true);
        }else{
            callback(new Error('no permitido'));
        }
    }
}

app.use(cors())
app.use(express.json());

// app.get('/', (req, res)=>{
//     res.send("Hola mi Server en Express")
// })

// app.get('/nueva-ruta', (req, res)=>{
//     res.send("Hola soy un nuevo enpoint")
// })

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler)
app.use(errorHandler);



app.listen(port, ()=>{
    console.log("Ejecutandose en localhost:" + port);
})





