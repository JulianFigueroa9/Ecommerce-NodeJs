
const express = require('express')
const { Router } = express
const productsRouter = Router()

const { getProducts, getProductByID, postProduct, updateProductByID, deleteProductByID, notFound } = require('../src/controllers/products.controller.js')

const admin = true

/* Getting all the products from the products.txt file. */
productsRouter.get('/', getProducts)

/* Getting the products by ID. */
productsRouter.get('/:id', getProductByID)

/* Saving the new product in the products.txt file. */
productsRouter.post('/', postProduct) 

/* Updating the product by ID. */
productsRouter.put('/:id', updateProductByID)

/* Deleting the product by ID. */
productsRouter.delete('/:id', deleteProductByID)

/* This is a catch-all route that will be executed if none of the previous routes are matched. */
productsRouter.get('*', notFound)

module.exports = productsRouter