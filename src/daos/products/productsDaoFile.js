const FileContainer = require('../../containers/fileContainer.js')

class DaoProductsFile extends FileContainer {
    constructor(){
        super('./src/data/products.txt')
    }

    async saveProduct(object){
        try {
            let data = await fs.promises.readFile(this.route, 'utf-8');
            let dataParse = JSON.parse(data)
            let timestamp = Date.now()
            let code = `EAN${Math.ceil(Math.random()*100 + 1)}`
            if (dataParse.length > 0){
                await fs.promises.writeFile(this.route,JSON.stringify([...dataParse, {...object, timestamp, code, id:dataParse[dataParse.length - 1].id + 1}], null, 2))
                return console.log(`El ID del producto es ${dataParse[dataParse.length-1].id + 1}`)
            } else {
                await fs.promises.writeFile(this.route,JSON.stringify([ {...object, timestamp, code, id:1} ], null, 2))
                return `El ID del producto es 1`
            }
           
        } catch (error) {
            console.log(error)
            
        }
    }
}

module.exports = DaoProductsFile