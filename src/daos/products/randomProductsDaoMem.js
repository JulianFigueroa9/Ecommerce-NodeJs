
const memContainer = require('../../containers/memContainer')
const randomProduct = require('../../../utils/faker/randomProducts')

class RandomProductsMock extends memContainer{
    constructor(){
        super()
    }

    async popular(qty = 5){
        const products = []
        for (let i = 0; i < qty; i++){
            const generatedRandomProduct = randomProduct()
            const savedRandomProduct = await this.saveElement(generatedRandomProduct)
            products.push(savedRandomProduct)
        }
        return products
    }
}

module.exports = RandomProductsMock