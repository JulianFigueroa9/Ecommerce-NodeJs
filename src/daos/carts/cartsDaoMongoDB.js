const MongoDBContainer = require('../../containers/mongoDBContainer.js')
const carts = require('../../databases/mongoDB/models/carts.models.js')

class DaoCartsMongoDB extends MongoDBContainer{
    constructor(){
        super(carts)
    }

    async addProductToCart(product, idCart) {
        try {
            const cartById = await this.getByID(+idCart)    
            if (cartById) { 
                cartById.products.push(product)
                await this.model.updateOne(
                    { id: idCart },
                    { $set: { products: cartById.products } }
                )
                return cartById
            } else {
                return `No existe carrito con id ${id}`
            }

        } catch (error) {
            console.log(error);
        }
    }

    async deleteProductById(idCart, idProduct) {
        try {
           
            let cart = await this.getById(idCart)
            if (cart) {
                let remainingProducts = cart.products.filter(product => product.id !== idProduct)
                cart.products = remainingProducts
                await this.updateByID(idCart, cart)
                console.log('Producto eliminado correctamente')
            } else {
                console.log('No se encontró el producto')
            }

        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = DaoCartsMongoDB