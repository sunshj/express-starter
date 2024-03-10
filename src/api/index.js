const { defineEventHandler } = require('express-filebased-routing')

exports.ALL = defineEventHandler(() => {
    return { msg: 'Express API is work' }
})
