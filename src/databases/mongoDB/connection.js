const mongoose = require('mongoose')
const dotenv = require('dotenv').config()

const connectDB = async () => {
    try {
        const url = process.env.MONGODB_URL
        await mongoose.connect(url,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('MongoDB connected');
    } catch (error) {
        console.error(error)   
    }
}
module.exports = connectDB

