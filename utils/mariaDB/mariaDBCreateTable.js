const { optionsMDB } = require('../../src/databases/sqlLite3/config/configMariaDB.JS')
const knexMariaDB = require('knex')(optionsMDB)

const products = [
    {
        "title": "Torta Dripcake",
        "description": "Torta rellena con baño de repostería",
        "thumbnail": "https://julianfigueroa9.github.io/WebProyect-HTML-CSS/imagenes/galeria6.jpg",
        "price": "2100",
        "stock": "25",
    },
    {
        "title": "Cupcake",
        "description": "Magdalena rellena con topping a elección",
        "thumbnail": "https://julianfigueroa9.github.io/WebProyect-HTML-CSS/imagenes/especialidad1.jpg",
        "price": "500",
        "stock": "200",
    },
    {
        "title": "Ice Popcake",
        "description": "Bizcochuelo con forma de helado con baño de repostería",
        "thumbnail": "https://julianfigueroa9.github.io/WebProyect-HTML-CSS/imagenes/especialidadpopcake2.jpg",
        "price": "600",
        "stock": "100",
    }
]

const nameTableMariaDB = 'products'

const batchMariaDB = async () => {
    try {
        console.log('Creando tabla de productos');
        await knexMariaDB.schema.createTable(nameTableMariaDB, table =>{
            table.increments('id')
            table.string('title')
            table.string('description')
            table.string('thumbnail')
            table.float('price')
            table.float('stock')
            table.timestamp('timestamp')
    
            
        })
        
        console.log('Insertando productos en la tabla');
        await knexMariaDB(nameTableMariaDB).insert(products)

    } catch (error) {
        console.log(error);
    } finally{
        knexMariaDB.destroy()
    }
}

batchMariaDB()