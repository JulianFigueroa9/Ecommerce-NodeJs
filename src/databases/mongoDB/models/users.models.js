const mongoose = require('mongoose')

const UsersSchema = new mongoose.Schema({ 
    username: { type: String, require: true },
    password: { type: String, require: true },
    email: { type: String, require: false },
})

module.exports = mongoose.model('Users', UsersSchema)