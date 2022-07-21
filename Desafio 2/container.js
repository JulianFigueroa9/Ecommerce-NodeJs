const fs= require('fs');

class Container{
    constructor(route){
    this.route = route;
    }

    async save(object){
        try {
            let data = await fs.promises.readFile(this.route, 'utf-8');
            let dataParse = JSON.parse(data)
            if (dataParse.length){
                await fs.promises.writeFile(this.route,JSON.stringify([...dataParse, {...object, id:dataParse[dataParse.length - 1].id + 1}], null, 2))
            } else {
                await fs.promises.writeFile(this.route,JSON.stringify([ {...object, id:1} ], null, 2))
            }
           
            return console.log((`El ID del objeto es ${dataParse[dataParse.length - 1].id + 1}`))
            
        } catch (error) {
            console.log(error)
            
        }
        
    }

    async getByID(id){
        try {
            let data = await fs.promises.readFile(this.route, 'utf-8')
            let dataParse = JSON.parse(data)
            let producto = dataParse.find(producto => producto.id === id)
            if(producto){
                return console.log(producto)
            } else {
                return null
            }
            
        } catch (error) {
            console.log(error)
            
        }

    }

    async getAll(){
        try {
            let data = await fs.promises.readFile(this.route, 'utf-8')
            let dataParse = JSON.parse(data)
            if(dataParse.length){
                return console.log(dataParse)
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
            let producto = dataParse.find(producto => producto.id === id)
            if(producto) {
                let dataParseFilt = dataParse.filter(producto => producto.id !== id)
                await fs.promises.writeFile(this.route, JSON.stringify(dataParseFilt, null, 2), 'utf-8')
                return console.log(dataParseFilt)
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
}

module.exports= Container


