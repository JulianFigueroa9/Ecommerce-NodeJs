const KnexContainer = require('./src/containers/knexContainer.js')

const { productsRouter, randomProductsRouter } = require('./routers/productsRouter.js')
const cartsRouter = require('./routers/cartsRouter.js')

const { optionsSQL3 } = require('./src/databases/sqlLite3/config/configSQLite3.js')

const knexSQL3 = require('knex')(optionsSQL3)

const chat = new KnexContainer(knexSQL3, 'chat')

const express = require('express')
const PORT = process.env.PORT || 8080
const app = express()
app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({ extended:true }))
app.use('/api/productos', productsRouter)
app.use('/api/productos-test', randomProductsRouter)
app.use('/api/carrito', cartsRouter)

const { Server: HTTPServer } = require('http')
const { Server: IOServer } = require('socket.io')
const httpServer = new HTTPServer(app)
const io = new IOServer(httpServer)

io.on("connection", async socket => {
    console.log("Se contectó un usuario")

    /* ---------------------------------- Chat ---------------------------------- */
    const chatMessages = await chat.getAll()

    const message = {
        mensaje: "ok",
        chatMessages
    }

    socket.emit('server-message', message)

    socket.on('new-message', async (newMessage, cb) => {
        chatMessages.push(newMessage)
        const message = {
            mensaje: "mensaje nuevo",
            chatMessages
        }

        const id = new Date().getTime();
		io.sockets.emit("server-message", message);
		cb(id)
        
        await chat.save({
            id,
            mail: newMessage.mail,
            date: newMessage.date,
            message: newMessage.message

        })
    })

});

/* Creating a server and listening to the port 8080. */
const server = httpServer.listen(PORT, () => {
    console.log(`Escuchando en el puerto: ${server.address().port}`)
})