const express = require('express')
const cookieParser = require("cookie-parser");
const session = require('express-session')
const logger = require("morgan");
const MongoStore = require('connect-mongo');

const chatFileContainer = require('./src/containers/chatFileContainer.js')
const exec = require("child_process").exec;

const { productsRouter, randomProductsRouter } = require('./src/routers/productsRouter.js')
const cartsRouter = require('./src/routers/cartsRouter.js')
const sessionRouter = require('./src/routers/sessionRouter.js')
const cookiesRouter = require('./src/routers/cookiesRouter.js')

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



/* ----------------------------- MONGODB SESSION ---------------------------- */

app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URL,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true }
    }),
    secret: 'secreto',
    resave: true,
    saveUninitialized: true,
    rolling: true,
    cookie: {
        maxAge: 1000 * 60 * 10
    }
}))


app.use(cookieParser(process.env.COOKIES_SECRET || '1234'));
app.use('/api/cookies', cookiesRouter)
app.use('/api/session', sessionRouter)

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
