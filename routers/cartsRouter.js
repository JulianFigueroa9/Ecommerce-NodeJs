
const express = require('express')
const { Router } = express
const cartsRouter = Router()

const cartsContainer = require('../controllers/fileControllers/cartContainer.js')
const cart = new cartsContainer('./data/cart.txt')

const admin = true

/* Getting the products from the cart by ID. */
cartsRouter.get('/:id/productos', async (req, res) => {
    const { id } = req.params;
	const cartById = await cart.getByID(parseInt(id))
    if(id == cartById.id){
        let productList = cartById.products;
        if (productList){
            res.json(
                productList
            )  
        } else {
            res.json(
                {
                    mensaje: "El carrito no cuenta con productos."
                }
            ) 
        }
    } else {
        res.status(400).json(
            {
                error: `El carrito con id ${id} no existe.`
            }
        )
    }
})

/* Creating a new cart. */
cartsRouter.post('/', async (req, res) => {
	const newCart = await cart.save(req.body);
        res.json(
            {
                mensaje: `El carrito fue creado correctamente. Su ID es ${newCart}.` 
            }
        )
})

/* Adding a product to the cart. */
cartsRouter.post('/:id/productos', async (req, res) => {
    const { id } = req.params
    const addProduct = req.body
    const cartById = await cart.getByID(+id)
    if(id == cartById.id){
        const productToCart = await cart.addProductToCart(id, addProduct)
        res.json(
            productToCart
        )
    } else {
        res.status(400).json(
            {
                error: `El carrito con id ${id} no existe.`
            }
        )
    }
    }
)

/* Deleting the cart by ID. */
cartsRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const cartById = await cart.getByID(+id)
    if(id == cartById.id){
        await cart.deleteByID(+id);
        res.json(
            {
                message:"carrito eliminado correctamente."
            }
        )
    } else {
        res.status(400).json(
            {
                error: `El carrito con id ${id} no existe.`
            }
        )
    }
})

/* Deleting the product from the cart by ID. */
cartsRouter.delete('/:idCart/products/:idProd', async (req, res) => {
    const { idCart, idProd } = req.params;
    const cartById = await cart.getByID(+idCart)
    const productById = await products.getByID(+idProd)
    if((idCart == cartById.id) && (idProd == productById.id)){
        await cart.deleteProductById(+idCart, +idProd);
        res.json(
            {
                message:"producto eliminado correctamente."
            }
        )
    } else {
        res.json(
            {
                error:"El id del carrito o de producto es incorrecto."
            }
        )
    }
})


/* A catch-all route that will be executed if none of the previous routes are matched. */
cartsRouter.get('*', async (req, res) => {
    res.json(
        {
            error: "Ruta no implementada"
        }
    )
})

module.exports = cartsRouter