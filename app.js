const express = require('express');
const routerApi = require('./routes')
const cors = require('cors')

const { logErrors, errorHandler , boomErrorHandler} = require('./middlewares/error.handler')

const app = express();
const port = 3000;

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





