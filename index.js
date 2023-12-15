const asyncApp = require('./src/app')
const debug = require('debug')('express-starter:server')
const http = require('http')

const port = normalizePort(process.env.PORT || '3000')
let server

async function startServer() {
    const app = await asyncApp()
    app.set('port', port)
    server = http.createServer(app)
    server.listen(port, '127.0.0.1')
    server.on('error', onError)
    server.on('listening', onListening)
}

function normalizePort(val) {
    const port = parseInt(val, 10)

    if (isNaN(port)) {
        return val
    }

    if (port >= 0) {
        return port
    }

    return false
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error
    }

    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges')
            process.exit(1)
        case 'EADDRINUSE':
            console.error(bind + ' is already in use')
            process.exit(1)
        default:
            throw error
    }
}

function onListening() {
    const addr = server.address()
    console.log(`➜  Local:   http://${addr['address']}:${addr['port']}`)
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
    debug('Listening on ' + bind)
}

startServer()
