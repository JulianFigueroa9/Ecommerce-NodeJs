/* Importing the container.js file and creating a new instance of the Container class. */
const Container = require("./container")
const products = new Container('./products.txt')

/* Importing the express module and creating a new express application. */
const express = require('express')
const app = express()
const { Router } = express
const router = Router()

app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({ extended:true }))

/* Creating a server and listening to the port 8080. */
const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Escuchando en el puerto: ${server.address().port}`)
})

/* Getting all the products from products.txt */
router.get('/', async (req, res) => {
    const allProducts = await products.getAll()
    res.json(
        allProducts
    )
})

/* Getting the product by ID. */
router.get('/:id', async (req, res) => {
    const {id} = req.params
    const productsById = await products.getByID(+id)
    res.json(
        productsById
    )
})

/* Saving the new product in the products.txt file. */
router.post('/', async (req, res) => {
    const newProduct = req.body
    await products.save(newProduct)
        res.json({
            ok: true,
            message: 'El producto se agregó correctamente',
            newProduct
            
        })
})

/* Updating the product by ID. */
router.put('/:id', async (req, res) => {
    const {id} = req.params
    const modifiedProduct = req.body
    await products.updateById( {id:+id, ...modifiedProduct} )
        res.json(
            {
                message: 'Producto modificado',
                modifiedProduct
            }
        )
})

/* Deleting the product by ID. */
router.delete('/:id', async (req, res) => {
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
})

/* Telling the server to use the router for the /api/products route. */
app.use('/api/products', router)

/* Getting a random product from the products.txt file. */
app.get('/randomProduct', async (req, res) => {
    let quantity = await products.getLength()
    let random = Math.floor(Math.random()*quantity)+1
    let randomProduct = await products.getByID(random)
    res.json(
        randomProduct
    )
})