const fs= require('fs');

class cartsContainer{
    constructor(route){
    this.route = route;
    }

    async save(cart){
        try {
            let data = await fs.promises.readFile(this.route, 'utf-8');
            let dataParse = JSON.parse(data)
            let timestamp = Date.now()
            if (dataParse.length > 0){
                await fs.promises.writeFile(this.route,JSON.stringify([...dataParse, {...cart, timestamp, id:dataParse[dataParse.length - 1].id + 1}], null, 2))
                return console.log(`El ID del carrito es ${dataParse[dataParse.length-1].id + 1}`)
            } else {
                await fs.promises.writeFile(this.route,JSON.stringify([ {...cart, timestamp, id:1} ], null, 2))
                return console.log(`El ID del carrito es 1`)
            }
            
        } catch (error) {
            console.log(error)
            
        }
        
    }

    async getByID(id){
        try {
            let data = await fs.promises.readFile(this.route, 'utf-8')
            let dataParse = JSON.parse(data)
            let cart = dataParse.find(cart => cart.id === id)
            if(cart){
                return cart
            } else {
                return {error: 'carrito no encontrado'}
            }
            
        } catch (error) {
            console.log(error)
            
        }

    }

    async updateByID(id, cart) {
        cart.id = id

        try {
            const carts = await this.getAll()
            const index = carts.findIndex(obj => obj.id === id)
            if (index !== -1){
                carts[index] = cart
                await fs.promises.writeFile(this.route, JSON.stringify(carts, null, 2))
                return {mensaje: 'Carrito actualizado'}

            } else {
                return {mensaje: 'Carrito no encontrado'}
            }
        
        } catch (error) {
            console.log(error);
        }
    }

    async getAll(){
        try {
            let data = await fs.promises.readFile(this.route, 'utf-8')
            let dataParse = JSON.parse(data)
            if(dataParse.length){
                return dataParse
            } else {
                return null
            }

        } catch (error) {
            console.log(error)
        }

    }

    async deleteByID(id){
        try {
            let data = await fs.promises.readFile(this.route, 'utf-8')
            let dataParse = JSON.parse(data)
            let carrito = dataParse.find(carrito => carrito.id === id)
            if(carrito) {
                let dataParseFilt = dataParse.filter(carrito => carrito.id !== id)
                await fs.promises.writeFile(this.route, JSON.stringify(dataParseFilt, null, 2), 'utf-8')
                return dataParseFilt
            } else {
                return null
            }
        } catch (error) {
            console.log(error)
        }
    
    }

    async deleteAll(){
        await fs.promises.writeFile(this.route,JSON.stringify([], null, 2),'utf-8')

    }

    async getLength(){
        let data = await fs.promises.readFile(this.route, 'utf-8')
        let dataParse = JSON.parse(data)
        return dataParse.length
    }

    async addProductToCart(idCart, product) {
        try {
            const cartById = await this.getByID(parseInt(idCart))
            let timestamp = Date.now()
            if (cartById.products.length) {
                
                let productToAdd = { id: cartById.products[cartById.products.length - 1].id + 1, timestamp,...product}
                cartById.products.push(productToAdd)
                await this.updateByID(+idCart, cartById)
                let idProduct = cartById.products[cartById.products.length - 1].id
                console.log(`El producto agregado tiene el ID: ${idProduct}`);
                return idProduct;

            } else {

                let productToAdd = { id: 1, timestamp, ...product}
                cartById.products.push(productToAdd)
                await this.updateByID(+idCart, cartById)

                console.log(`El producto agregado tiene el ID: 1`);
                return 1;

            }

        } catch (error) {
            console.log(error);
        }
    }

    async deleteProductById(idCart, idProduct) {
        try {
            let data = await fs.promises.readFile(this.route, 'utf8')
            let dataParse = JSON.parse(data)
            let carrito = dataParse.find(carrito => carrito.id === idCart)
            let product = carrito.products.find(product => product.id === idProduct)
            console.log(product);
            if (product) {
                let productosFiltrados = carrito.products.filter(product => product.id !== idProduct)
                carrito.products = productosFiltrados
                this.updateByID(idCart, carrito)
                console.log('Producto Eliminado')
            } else {
                console.log('No se encontró el Producto')
            }

        } catch (error) {
            console.log(error);
        }
    }
}





module.exports = cartsContainer