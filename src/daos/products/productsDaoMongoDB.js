const MongoDBContainer = require('../../containers/mongoDBContainer.js')
const products = require('../../databases/mongoDB/models/products.models.js')

class DaoProductsMongoDB extends MongoDBContainer {
    constructor(){
        super(products)
    }
}

module.exports = DaoProductsMongoDB