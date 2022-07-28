const Container = require("./container")

const products = new Container('./productos.txt')

const express = require('express')

const app = express()

const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Escuchando en el puerto: ${server.address().port}`)
})

app.get('/products', async (req, res) => {
    const allProducts = await products.getAll()
    res.json(
        allProducts
    )
})

app.get('/randomProduct', async (req, res) => {
    let quantity = await products.getLength()
    let random = Math.floor(Math.random()*quantity)+1
    let randomProduct = await products.getByID(random)
    res.json(
        randomProduct
    )
})



