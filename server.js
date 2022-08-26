
/* Importing the productsContainer and cartContainer modules and creating new instances of them. */
const productsContainer = require("./controllers/productsContainer")
const cartsContainer = require('./controllers/cartContainer.js')
const products = new productsContainer('./data/products.txt')
const cart = new cartsContainer('./data/cart.txt')
const admin = true;

/* Importing the express module and creating a new express application. */
const express = require('express')
const app = express()
const { Router } = express
const productsRouter = Router()
const cartRouter = Router()

/* Telling the server to use the express.json() method, the express.static() method and the
express.urlencoded() method. */
app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({ extended:true }))

const PORT = process.env.PORT || 8080

/* Creating a server and listening to the port 8080. */
const server = app.listen(PORT, () => {
    console.log(`Escuchando en el puerto: ${server.address().port}`)
})

/* ---------------------------- PRODUCTS --------------------------- */

/* Getting all the products from the products.txt file. */
productsRouter.get('/', async (req, res) => {
    const allProducts = await products.getAll()
    res.json(
            allProducts
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
        res.json(
            {
                error:`no existe el producto con id ${id}.`
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
            res.json(
                {
                    error:`No existe el producto con id ${id}.`
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
            res.json(
                {
                    error:`No existe el producto con id ${id}.`
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

/* Telling the server to use the productsRouter module. */
app.use('/api/products', productsRouter)

/* ------------------------------------------------------------------------ */

/* ---------------------------------- CARTS --------------------------------- */

/* Getting the products from the cart by ID. */
cartRouter.get('/:id/products', async (req, res) => {
    const { id } = req.params;
	const cartById = await cart.getByID(parseInt(id));
    if(id == cartById.id){
        let productList = cartById.products;
        res.json(
            productList
        )  
    } else {
        res.json(
            {
                error:`No existe el carro con id ${id}.` 
            }
        )
    }
})

/* Creating a new cart. */
cartRouter.post('/', async (req, res) => {
	const newCart = await cart.save(req.body);
	res.json(
        {
            message: "Carrito creado", 
            newCart
        }
    );

})

/* Adding a product to the cart. */
cartRouter.post('/:id/products', async (req, res) => {
    const { id } = req.params
    const addProduct = req.body
    const cartById = await cart.getByID(+id)
    if(id == cartById.id){
        const productToCart = await cart.addProductToCart(id, addProduct)
        res.json(
            productToCart
        )
    } else {
        res.json(
            {
                error:`No existe el carrito con id ${id}.`
            }
        )
    }
    }
)

/* Deleting the cart by ID. */
cartRouter.delete('/:id', async (req, res) => {
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
        res.json(
            {
                error:`No existe carrito con id ${id}.`
            }
        )
    }
})

/* Deleting the product from the cart by ID. */
cartRouter.delete('/:idCart/products/:idProd', async (req, res) => {
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
cartRouter.get('*', async (req, res) => {
    res.json(
        {
            error: "Ruta no implementada"
        }
    )
})

/* Telling the server to use the cartRouter module. */
app.use('/api/cart', cartRouter)