const express = require('express')
const cookieParser = require("cookie-parser");
const session = require('express-session')
const logger = require("morgan");
const MongoStore = require('connect-mongo');

const chatFileContainer = require('./src/containers/chatFileContainer.js')
const exec = require("child_process").exec;

const { productsRouter, randomProductsRouter } = require('./routers/productsRouter.js')
const cartsRouter = require('./routers/cartsRouter.js')
const sessionRouter = require('./routers/sessionRouter.js')
const cookiesRouter = require('./routers/cookiesRouter.js')

const readChat = new chatFileContainer('./utils/chat/normalizedMessages.json')
const saveChat = new chatFileContainer('./utils/chat/nonNormalizedMessages.json')


const PORT = process.env.PORT || 8080
const app = express()
app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({ extended:true }))
app.use(logger('dev'))
app.use('/api/productos', productsRouter)
app.use('/api/productos-test', randomProductsRouter)
app.use('/api/carrito', cartsRouter)
app.use('/api/session', sessionRouter)
app.use('/api/cookies', cookiesRouter)


/* ----------------------------- MONGODB SESSION ---------------------------- */
const configMongoDB = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

app.use(session({
    secret: process.env.SESSION_SECRET || '1234',
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({mongoUrl: process.env.MONGODB_URL, mongoOptions: configMongoDB})
}))

app.use(cookieParser(process.env.COOKIES_SECRET || '1234'));

/* ----------------------------- CHAT WEBSOCKET ----------------------------- */

const { Server: HTTPServer } = require('http')
const { Server: IOServer } = require('socket.io');

const httpServer = new HTTPServer(app)
const io = new IOServer(httpServer)

io.on("connection", async socket => {
    console.log("Se contectó un usuario")

    /* ---------------------------------- Chat ---------------------------------- */
    let chatMessages = await readChat.getAll()

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

		io.sockets.emit("server-message", message);
        await saveChat.save({
            author: newMessage.author,
            message: newMessage.message

        })
        exec('node ./utils/chat/normalizr.js', async (err, stdout, stderr) => {
            if (err !== null) {
                console.error(`error de exec: ${err}`);
            }
            return (chatMessages = await readChat.getAll());
        });
       
    })

});

/* Creating a server and listening to the port 8080. */
const server = httpServer.listen(PORT, () => {
    console.log(`Escuchando en el puerto: ${server.address().port}`)
})