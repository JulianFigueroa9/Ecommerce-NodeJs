const MongoDBContainer = require('../../containers/mongoDBContainer')
const Users = require('../../databases/mongoDB/models/users.models')

class DaoUsersMongoDB extends MongoDBContainer {
    constructor() {
        super(Users)
    }

    async getByUsername(username) {
        try {
            let user = await this.model.find({ username: username })

            if (user) {
                console.log(user)
                return user[0]
            } else {
                console.log('El usuario no existe');
                return null
            }
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = DaoUsersMongoDB