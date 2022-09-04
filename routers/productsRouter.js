const ContainerDB = require('../controllers/DBContollers/containerDB.js')
const { optionsMDB } = require('../databases/config/configMariaDB.js')
const knexMariaDB = require('knex')(optionsMDB)
const product = new ContainerDB(knexMariaDB, 'products')

const express = require('express')
const { Router } = express
const productsRouter = Router()

const admin = true

/* Getting all the products from the products.txt file. */
productsRouter.get('/', async (req, res) => {
    const allProducts = await product.getAll()
    res.json(
            allProducts
    )
})

/* Getting the products by ID. */
productsRouter.get('/:id', async (req, res) => {
    const {id} = req.params
    const productById = await product.getByID(+id)
    if (productById){
        res.json(
            productById
        )
    } else {
        res.status(400).json(
            {
                error: `El producto con id ${id} no existe.`
            }
        )
    }
})

/* Saving the new product in the products.txt file. */
productsRouter.post('/', async (req, res) => {
    if(admin){ 
        const newProduct = req.body
        await product.save(newProduct)
        const allProducts = await product.getAll()
        res.json(
                allProducts
        )
    } else {
        res.json(
            {
                error:"No tienes permiso para agregar productos."
            }
        )
    }
    
}) 

/* Updating the product by ID. */
productsRouter.put('/:id', async (req, res) => {
    const {id} = req.params
    if(admin){
        const productById = await product.getByID(+id)
        const modifiedProduct = req.body
        await product.updateById( {id:+id, ...modifiedProduct} )
        if(productById){
            res.json(
                {
                    message: 'Producto modificado',
                    modifiedProduct
                }
            )
        } else {
            res.status(400).json(
                {
                    error: `El producto con id ${id} no existe.`
                }
            )
        }
    } else {
        res.json(
            {
                error:"No tienes permiso para actualizar productos."
            }
        )
    }
})

/* Deleting the product by ID. */
productsRouter.delete('/:id', async (req, res) => {
    const {id} = req.params
    const productById = await product.getByID(+id)
    if(admin){
        if(productById){
            const remainingProducts = await product.deleteByID(+id)
                res.json(
                    {
                        ok: true,
                        message: 'El producto se eliminó correctamente',
                        id: id,
                        remainingProducts
                    }
                )
        } else{
            res.status(400).json(
                {
                    error: `El producto con id ${id} no existe.`
                }
            )
        }
    } else {
        res.json(
            {
                error:"No tienes permiso para borrar un producto."
            }
        )
    }
})

/* This is a catch-all route that will be executed if none of the previous routes are matched. */
productsRouter.get('*', (req, res) => {
    res.json(
        {
            error:"Ruta no implementada."
        }
    )
})

module.exports = productsRouter