// this is the entry point for the node server
require('dotenv').config({
    path: 'variables.env'
})
const createServer = require('./createServer')
const db = require('./db')

const server = createServer()

server.start({
    cors: {
        credentials: true,
        origin: process.env.FRONTEND_URL
    },
}, boot => console.log(`Server running on http://localhost:${boot.port}`))