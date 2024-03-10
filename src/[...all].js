const { defineEventHandler } = require('express-filebased-routing')

module.exports = defineEventHandler({
    GET(req, res) {
        res.status(404).send('404 Not Found')
    },
    ALL(req, res) {
        res.status(405).send('405 Method Not Allow')
    },
})
