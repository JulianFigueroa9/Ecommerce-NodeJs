const { response } = require("express")

const { productsDao, cartsDao } = require('../daos/index.js')

const carts = cartsDao
const products = productsDao


const getCarts = async (req, res = response) => {
    const allCarts = await carts.getAll()
    if (allCarts) {
        res.json(
            allCarts
        )
    } else {
        res.json(
            {
                mensaje: "No existen carritos actualmente."
            }
        ) 
    }
}

const getProductsFromCartID = async (req, res = response) => {
    const { id } = req.params
	const cartById = await carts.getByID(parseInt(id))
    if(cartById && id == cartById.id){
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
}

const postNewCart = async (req, res = response) => {
	const newCart = await carts.save(req.body);
        res.json(
            {
                mensaje: `El carrito fue creado correctamente. Su ID es ${newCart}.` 
            }
        )
}

const postProductToCart = async (req, res = response) => {
    const { id } = req.params
    const addProduct = req.body
    const cartById = await carts.getByID(+id)
    if(id == cartById.id){
        const productToCart = await carts.addProductToCart(id, addProduct)
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

const deleteCartByID = async (req, res = response) => {
    const { id } = req.params;
    const cartById = await carts.getByID(+id)
    if(id == cartById.id){
        await carts.deleteByID(+id);
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
}

const deleteProductFromCart = async (req, res = response) => {
    const { idCart, idProd } = req.params;
    const cartById = await carts.getByID(+idCart)
    const productById = await products.getByID(+idProd)
    if((idCart == cartById.id) && (idProd == productById.id)){
        await carts.deleteProductById(+idCart, +idProd);
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
}

const notFound = async (req, res = response) => {
    res.json(
        {
            error: "Ruta no implementada"
        }
    )
}

module.exports = {
    getCarts,
    getProductsFromCartID,
    postNewCart,
    postProductToCart,
    deleteCartByID,
    deleteProductFromCart,
    notFound
}