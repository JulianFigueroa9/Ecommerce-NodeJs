const dotenv = require('dotenv').config()

let productsDao
let cartsDao

switch (process.env.FILE) {
    case 'txt':
        const ProductDaoFile = require('./products/productsDaoFile.js')
        const CartsDaoFile = require('./carts/cartsDaoFile.js')

        productsDao = new ProductDaoFile()
        cartsDao = new CartsDaoFile()

        break

    case 'mongodb':
        const ProductsDaoMongoDB = require('./products/productsDaoMongoDB.js')
        const CartsDaoMongoDB = require('./carts/cartsDaoMongoDB.js')

        productsDao = new ProductsDaoMongoDB()
        cartsDao = new CartsDaoMongoDB()
        
        break
}

module.exports = { productsDao, cartsDao }