const express = require('express')
const { Router } = express
const cartsRouter = Router()

const { getCarts, getProductsFromCartID, postNewCart, postProductToCart, deleteCartByID, deleteProductFromCart, notFound } = require('../controllers/carts.controller.js')

const admin = true

cartsRouter.get('/', getCarts)

/* Getting the products from the cart by ID. */
cartsRouter.get('/:id/productos', getProductsFromCartID)

/* Creating a new cart. */
cartsRouter.post('/', postNewCart)

/* Adding a product to the cart. */
cartsRouter.post('/:id/productos', postProductToCart)

/* Deleting the cart by ID. */
cartsRouter.delete('/:id', deleteCartByID)

/* Deleting the product from the cart by ID. */
cartsRouter.delete('/:idCart/products/:idProd', deleteProductFromCart)

/* A catch-all route that will be executed if none of the previous routes are matched. */
cartsRouter.get('*', notFound)

module.exports = cartsRouter