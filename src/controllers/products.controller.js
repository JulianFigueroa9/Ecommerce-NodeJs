const { response } = require("express")
const { productsDao } = require('../daos/index.js')
const products = productsDao

const randomProductDaoMem = require ('../daos/products/randomProductsDaoMem.js')
const randomProducts = new randomProductDaoMem()

const admin = true

const getProducts = async (req, res = response) => {
    const allProducts = await products.getAll()
    res.render('products', {
        allProducts
        }
    )
}

const getProductByID = async (req, res = response) => {
    const {id} = req.params
    const productById = await products.getByID(parseInt(id))
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
}

const getRandomProduct = async (req, res) => {
    res.json(
        await randomProducts.popular(5)
    )
} 

const postProduct = async (req, res = response) => {
    if(admin){ 
        const newProduct = req.body
        await products.saveProduct(newProduct)
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
}

const updateProductByID = async (req, res = response) => {
    const {id} = req.params
    if(admin){
        const productById = await products.getByID(+id)
        const modifiedProduct = req.body
        await products.updateById( {id:+id, ...modifiedProduct} )
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
}

const deleteProductByID = async (req, res = response) => {
    const {id} = req.params
    const productById = await products.getByID(+id)
    if(admin){
        if(productById){
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
}

const notFound = (req, res = response) => {
    res.json(
        {
            error:"Ruta no implementada."
        }
    )
}

module.exports = {
    getProducts,
    getProductByID,
    getRandomProduct,
    postProduct,
    updateProductByID,
    deleteProductByID,
    notFound
}