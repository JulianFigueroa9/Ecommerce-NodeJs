/* Importing the container.js file and creating a new instance of the Container class. */
const Container = require("./container")
const products = new Container('./products.txt')

/* Importing the express module and creating a new express application. */
const express = require('express')
const app = express()
const { Router } = express
const router = Router()

app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({ extended:true }))

/* Creating a server and listening to the port 8080. */
const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Escuchando en el puerto: ${server.address().port}`)
})

app.set('views', './views/viewEjs')
app.set('view engine', 'ejs')


router.get('/', async (req, res) => {
    const allProducts = await products.getAll()
    if (allProducts){
        res.render('index', {
            allProducts
        })
    } else{
        res.json(
            {
                error:"No existen productos"
            }
        )
    }
})


router.post('/', async (req, res) => {
    const newProduct = req.body
    await products.save(newProduct)
    const allProducts = await products.getAll()
    res.render('index', {
        allProducts
    })

})


app.use('/products', router)