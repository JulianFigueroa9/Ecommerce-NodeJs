const express = require('express')
const { Router } = express
const infoServerRouter = Router()

const { parsedArgs } = require('../../config.js')

infoServerRouter.get('/', async (req, res) => {
    res.send(
        {
            arguments: JSON.stringify(parsedArgs),
            execPath: process.execPath,
            projectDirectory: process.cwd(),
            processID: process.pid,
            nodeVersion: process.version,
            processTitle: process.title,
            processPlatform: process.platform,
            memoryUsage: process.memoryUsage()
        }
    )
})

module.exports = infoServerRouter