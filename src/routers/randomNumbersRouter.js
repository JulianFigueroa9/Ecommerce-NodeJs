const express = require('express')
const { Router } = express

const {fork} = require('child_process')

const randomNumbersRouter = Router()

randomNumbersRouter.get('/', (req, res ) => {
    let { cant } = req.query
    const randomNumbers = fork('./utils/randomNumbersQty/randomNumbersQty.js', [cant])
    randomNumbers.send('start')
    randomNumbers.on('message', msg => {
        res.json(msg)
    })
})

module.exports = randomNumbersRouter