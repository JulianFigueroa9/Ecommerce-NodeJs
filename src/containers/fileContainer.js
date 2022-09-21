const fs= require('fs');

class FileContainer{
    constructor(route){
    this.route = route;
    }

    async save(object){
        try {
            let data = await fs.promises.readFile(this.route, 'utf-8');
            let dataParse = JSON.parse(data)
            let timestamp = Date.now()
            if (dataParse.length > 0){
                await fs.promises.writeFile(this.route,JSON.stringify([...dataParse, {...object, timestamp, id:dataParse[dataParse.length - 1].id + 1}], null, 2))
                return console.log(`El ID del objeto es ${dataParse[dataParse.length-1].id + 1}`)
            } else {
                await fs.promises.writeFile(this.route,JSON.stringify([ {...object, timestamp, id:1} ], null, 2))
                return `El ID del objeto es 1`
            }
           
        } catch (error) {
            console.log(error)
            
        }
        
    }

    async getByID(id){
        try {
            let data = await fs.promises.readFile(this.route, 'utf-8')
            let dataParse = JSON.parse(data)
            let object = dataParse.find(object => object.id === id)
            if(object){
                return object
            } else {
                return {error: 'Item no encontrado'}
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
				return { message: "Item actualizado" };
			} else {
				return { error: "Item no encontrado" };
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
            let object = dataParse.find(object => object.id === id)
            if(object) {
                let dataParseFilt = dataParse.filter(object => object.id !== id)
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

module.exports= FileContainer


