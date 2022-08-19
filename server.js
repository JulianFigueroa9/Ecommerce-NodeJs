/* Importing the container.js file and creating a new instance of the Container class. */
/* const Container = require("./container")
const products = new Container('./products.txt') */

/* Importing the express module and creating a new express application. */
const express = require('express')
const app = express()
const { Router } = express
const router = Router()

/* Importing the http and socket.io modules and creating new instances of the Server class. */
const { Server: HTTPServer } = require('http')
const { Server: IOServer } = require('socket.io')


/* Creating a new instance of the HTTPServer class and the IOServer class. */
const httpServer = new HTTPServer(app)
const io = new IOServer(httpServer)

/* Telling the server to use the express.json() method, the express.static() method and the
express.urlencoded() method. */
app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({ extended:true }))

const PORT = process.env.PORT || 8080

/* Creating a server and listening to the port 8080. */
const server = httpServer.listen(PORT, () => {
    console.log(`Escuchando en el puerto: ${server.address().port}`)
})

/* Telling the server to use the pug engine for the views. */
/* app.set('views', './views')
app.set('view engine', 'pug') */

let mensajesChat = []
let productos = []

io.on("connection",  socket => {
	console.log("Se contectó un usuario");

	const mensaje = {
		mensaje: "ok",
		mensajesChat
	};

    const producto = {
        mensaje: "ok",
        productos
    }

	socket.emit("mensaje-servidor", mensaje);

	socket.on("mensaje-nuevo", (msg, cb) => {
		mensajesChat.push(msg);
		const mensaje = {
			mensaje: "mensaje nuevo",
			mensajesChat
		};

		const id = new Date().getTime();
		io.sockets.emit("mensaje-servidor", mensaje);
		cb(id);
	});
    
    socket.emit("producto-servidor", producto)
    socket.on("producto-nuevo", (prod, cb) => {
        productos.push(prod)
        const producto = {
            mensaje: "producto nuevo",
            productos
        };

        const id = new Date().getTime();
        io.sockets.emit("producto-nuevo", producto)
        cb(id)
    })

});


/* --------------------------- DESAFIOS ANTERIORES -------------------------- */

/* Getting all the products from the products.txt file and rendering them in the index.pug file. */
/* router.get('/', async (req, res) => {
    const allProducts = await products.getAll()
    if (allProducts){
        res.render('index', {
            allProducts
        })
    } else{
        res.json(
            {
                error:"No existen productos"
            }
        )
    }
}) */


/* router.post('/', async (req, res) => {
    const newProduct = req.body
    await products.save(newProduct)
    const allProducts = await products.getAll()
    res.render('index', {
        allProducts
    })

})

app.use('/products', router) */


/* Getting all the products from products.txt */
/* router.get('/', async (req, res) => {
    const allProducts = await products.getAll()
    res.json(
        allProducts
    )
}) */

/* Getting the product by ID. */
/* router.get('/:id', async (req, res) => {
    const {id} = req.params
    const productsById = await products.getByID(+id)
    res.json(
        productsById
    )
}) */

/* Saving the new product in the products.txt file. */
/* router.post('/', async (req, res) => {
    const newProduct = req.body
    await products.save(newProduct)
        res.json({
            ok: true,
            message: 'El producto se agregó correctamente',
            newProduct
            
        })
}) */

/* Updating the product by ID. */
/* router.put('/:id', async (req, res) => {
    const {id} = req.params
    const modifiedProduct = req.body
    await products.updateById( {id:+id, ...modifiedProduct} )
        res.json(
            {
                message: 'Producto modificado',
                modifiedProduct
            }
        )
}) */

/* Deleting the product by ID. */
/* router.delete('/:id', async (req, res) => {
    const {id} = req.params
    const remainingProducts = await products.deleteByID(+id)
        res.json(
            {
                ok: true,
                message: 'El producto se eliminó correctamente',
                id: id,
                remainingProducts
            }
        )
}) */

/* Telling the server to use the router for the /api/products route. */
/* app.use('/api/products', router) */

/* Getting a random product from the products.txt file. */
/* app.get('/randomProduct', async (req, res) => {
    let quantity = await products.getLength()
    let random = Math.floor(Math.random()*quantity)+1
    let randomProduct = await products.getByID(random)
    res.json(
        randomProduct
    )
}) */