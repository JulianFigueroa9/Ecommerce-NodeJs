const { optionsSQL3 } = require('../../src/databases/sqlLite3/config/configSQLite3')
const knexSqlite3 = require('knex')(optionsSQL3)

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