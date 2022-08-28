
/* Importing the productsRouter.js and cartsRouter.js files. */
const productsRouter = require('./routers/productsRouter.js')
const cartsRouter = require('./routers/cartsRouter.js')

/* Importing the express module and creating a new express application. */
const express = require('express')
const app = express()

/* Telling the server to use the express.json() method, the express.static() method and the
express.urlencoded() method. */
app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({ extended:true }))
app.use('/api/productos', productsRouter)
app.use('/api/carrito', cartsRouter)

const PORT = process.env.PORT || 8080

/* Creating a server and listening to the port 8080. */
const server = app.listen(PORT, () => {
    console.log(`Escuchando en el puerto: ${server.address().port}`)
})

