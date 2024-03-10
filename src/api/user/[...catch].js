const { defineEventHandler } = require('express-filebased-routing')

exports.ALL = defineEventHandler(() => {
    return 'user not found!'
})
