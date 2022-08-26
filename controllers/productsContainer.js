const fs= require('fs');

class productsContainer{
    constructor(route){
    this.route = route;
    }

    async save(object){
        try {
            let data = await fs.promises.readFile(this.route, 'utf-8');
            let dataParse = JSON.parse(data)
            let timestamp = Date.now()
            let code = `EAN${Math.ceil(Math.random()*100 + 1)}`
            if (dataParse.length > 0){
                await fs.promises.writeFile(this.route,JSON.stringify([...dataParse, {...object, timestamp, code, id:dataParse[dataParse.length - 1].id + 1}], null, 2))
                return console.log(`El ID del objeto es ${dataParse[dataParse.length-1].id + 1}`)
            } else {
                await fs.promises.writeFile(this.route,JSON.stringify([ {...object, timestamp, code, id:1} ], null, 2))
                return console.log(`El ID del objeto es 1`)
            }
           
            
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
                return producto
            } else {
                return {error: 'Producto no encontrado'}
            }
            
        } catch (error) {
            console.log(error)
            
        }

    }

    async updateById(object) {
		try {
			let data = await fs.promises.readFile(this.route, 'utf-8');
            let dataParse = JSON.parse(data)
			const productIndex = dataParse.findIndex(prod => prod.id === object.id);
			if (productIndex !== -1) {
				dataParse[productIndex] = object;
				await fs.promises.writeFile(this.route, JSON.stringify(dataParse, null, 2));
				return { message: "Producto actualizado" };
			} else {
				return { error: "Producto no encontrado" };
			}
		} catch (error) {
			console.log(error);
		}
	}

    async getAll(){
        try {
            let data = await fs.promises.readFile(this.route, 'utf-8')
            let dataParse = JSON.parse(data)
            if(dataParse.length){
                return dataParse
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
                return dataParseFilt
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

    async getLength(){
        let data = await fs.promises.readFile(this.route, 'utf-8')
        let dataParse = JSON.parse(data)
        return dataParse.length
    }
}

module.exports= productsContainer


