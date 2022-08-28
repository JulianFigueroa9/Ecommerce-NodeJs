
const express = require('express')
const { Router } = express
const productsRouter = Router()

const productsContainer = require("../controllers/productsContainer")
const products = new productsContainer('./data/products.txt')

const admin = true

/* Getting all the products from the products.txt file. */
productsRouter.get('/', async (req, res) => {
    const allProducts = await products.getAll()
    res.json(
        {
            allProducts

        }
    )
})

/* Getting the products by ID. */
productsRouter.get('/:id', async (req, res) => {
    const {id} = req.params
    const productById = await products.getByID(+id)
    if (id == productById.id){
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
        await products.save(newProduct)
        const allProducts = await products.getAll()
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
        const productById = await products.getByID(+id)
        const modifiedProduct = req.body
        await products.updateById( {id:+id, ...modifiedProduct} )
        if(id == productById.id){
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
    const productById = await products.getByID(+id)
    if(admin){
        if(id == productById.id){
            const remainingProducts = await products.deleteByID(+id)
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