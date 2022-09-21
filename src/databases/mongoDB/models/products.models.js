const mongoose = require('mongoose')

const ProductsSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: false,
        trim: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
        trim: true,
        max: 50
    },
    description: {
        type: String,
        required: true,
        trim: true,
        max: 250
    },
    thumbnail: {
        type: String,
        required: true,
        trim: true,
        max: 500
    },
    price: {
        type: Number,
        required: true,
        trim: true,
    },
    stock: {
        type: Number,
        required: true,
        trim: true
    },
    timestamp: {
        type: Number,
        required: false,
        trim: true
    },
    code: {
        type: String,
        required: false,
        trim: true,
    }
})

module.exports = mongoose.model('Products', ProductsSchema)