const { defineEventHandler } = require('express-filebased-routing')

exports.GET = defineEventHandler((req, res) => {
    res.render('index', { title: 'Hello Express!', msg: 'Welcome to Express.js' })
})
