const dotenv = require('dotenv').config()
const connectDB = require('../databases/mongoDB/connection.js')

connectDB() 

class MongoDBContainer {

    constructor(model){
        this.model = model
    }

    async save(object) {
        try {
            let obj = new this.model(object)
            await obj.save()
            console.log('Objeto agregado correctamente');
        } catch (error) {
            console.log(error);
        }
    }

    async getByID(id) {
        try {
            let object = await this.model.findOne({ id: id })
    
            if (object) {
                return object
            } else {
                return console.log(`No existe el item con ID ${id}`);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getAll() {
        try {
            let objects = await this.model.find()
            if (objects) {
                return objects
            } else {
                console.log('No se encontraron resultados')
            }

        } catch (error) {
            console.log(error);
        }
    }

    async updateByID(id, product) {

        try {
            let timestamp = Date.now()
            if (this.getById(id)) {
                product.timestamp = timestamp
                await this.model.updateOne({ id: id }, { $set: product })
                return { mensaje: 'Objeto actualizado' }
            } else {
                return { mensaje: 'Objeto no encontrado' }
            }
        } catch (error) {
            console.log(error);
        }
    }

    async deleteByID(id) {
        try {
            if (this.getById(id)) {
                await this.model.deleteOne({ id: id })
                console.log('Objeto eliminado correctamente')
            } else {
                console.log('No se encontró el objeto')
            }

        } catch (error) {
            console.log(error);
        }
    }

    async deleteAll() {
        await this.model.deleteMany()
        console.log('Se eliminaron todos los objetos correctamente')
    }

}

module.exports = MongoDBContainer
