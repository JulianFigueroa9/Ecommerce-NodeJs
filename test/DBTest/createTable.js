const { optionsMDB } = require('../../src/databases/config/configMariaDB.js')
const { optionsSQL3 } = require('../../src/databases/config/configSQLite3.js')

const knexMariaDB = require('knex')(optionsMDB)
const knexSqlite3 = require('knex')(optionsSQL3)

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

/* -------------------------------- mensajes -------------------------------- */

const chat = [
    {
        "mail": "julianfigueroa@hotmail.com",
        "date": "15:36:24",
        "message": "Hola"
    },
    {
        "mail": "manuel12@gmail.com",
        "date": "15:36:48",
        "message": "Como va?"
    },
    {
        "mail": "lautaropm@gmail.com",
        "date": "15:37:02",
        "message": "Todo bien, ustedes?"
    },
    {
        "mail": "juan123@gmail.com",
        "date": "15:39:24",
        "message": "Todo perfecto!"
    }
]

const nameTableSqlite3 = "chat" 

const batchSqlite3 = async () =>{
    try {
        console.log('Creando tabla Mensajes...');
        await knexSqlite3.schema.createTable(nameTableSqlite3, table =>{
            table.increments('id')
            table.string('mail')
            table.float('date')
            table.string('message')
        })

        console.log('Insertando mensajes...');
        await knexSqlite3(nameTableSqlite3).insert(chat)  // Le podemos pasar un obj o un array

    } catch (error) {
        console.log(error)
    } finally {
        knexSqlite3.destroy()
    }
}


batchSqlite3()