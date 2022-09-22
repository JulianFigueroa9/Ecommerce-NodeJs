const { faker } = require('@faker-js/faker');
faker.locale = 'es'

const randomProduct = () => {
    return {
        title:faker.commerce.product(),
        price:faker.commerce.price(),
        thumbnail:faker.image.image(100,100,true)
    }  
}

module.exports = randomProduct
