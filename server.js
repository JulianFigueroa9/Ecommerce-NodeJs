require('dotenv').config()

const express = require('express')
const cookieParser = require("cookie-parser");
const session = require('express-session')
const logger = require("morgan");
const MongoStore = require('connect-mongo');
const passport = require('./src/middlewares/passport/passportLocal.middleware')

const chatFileContainer = require('./src/containers/chatFileContainer.js')
const exec = require("child_process").exec;

const { parsedArgs, config} = require('./config.js')

const { productsRouter, randomProductsRouter } = require('./src/routers/productsRouter.js')
const cartsRouter = require('./src/routers/cartsRouter.js')
const sessionRouter = require('./src/routers/sessionRouter.js')
const cookiesRouter = require('./src/routers/cookiesRouter.js')
const infoServerRouter = require('./src/routers/infoServerRouter.js')
const randomNumbersRouter = require('./src/routers/randomNumbersRouter.js')

const readChat = new chatFileContainer('./utils/chat/normalizedMessages.json')
const saveChat = new chatFileContainer('./utils/chat/nonNormalizedMessages.json')

const app = express()
app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({ extended:true }))
app.use(logger('dev'))

const numCPUs = require('os').cpus.lenght
const cluster = require('cluster')


app.set('view engine', 'ejs')
app.set('views', './src/views/pages')

/* ----------------------------- MONGODB SESSION ---------------------------- */

app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URL,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true }
    }),
    secret: config.sessionSecret,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 10
    },
    resave: true,
    saveUninitialized: true,
    rolling: true
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/api/session', sessionRouter)
app.use('/api/cookies', cookiesRouter)
app.use('/api/productos', productsRouter)
app.use('/api/productos-test', randomProductsRouter)
app.use('/api/carrito', cartsRouter)
app.use('/api/info', infoServerRouter)
app.use('/api/randoms', randomNumbersRouter)
app.use(cookieParser(config.cookiesSecret || '1234'));
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

const PORT = parsedArgs.port

const MODE = parsedArgs.mode
console.log(MODE)

if (MODE == "CLUSTER" && cluster.isPrimary) {
    console.log(`Puerto: ${PORT} - Modo: ${MODE}`);
    console.log(`Master ${process.pid} is running`)
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`)
    })
} else {
    httpServer.listen(PORT, (err) => {
        if (err) throw new Error(`No se pudo iniciar el servidor: ${err}`)
        console.log(`Servidor corriendo en el puerto ${PORT} - PID WORKER ${process.pid}`)
    })
}



