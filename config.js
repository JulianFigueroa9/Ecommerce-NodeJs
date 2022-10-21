require('dotenv').config()

const parseArgs = require('minimist')

const args = process.argv.slice(2)

const options = {
    alias: { p:'port', m:'mode'},
    default: { port: 8080, mode: 'FORK' }
}

const parsedArgs = parseArgs(args, options)

const config = {
    sessionSecret: process.env.SESSION_SECRET,
    cookiesSecret: process.env.COOKIES_SECRET
}

module.exports = {
    parsedArgs,
    config,
}