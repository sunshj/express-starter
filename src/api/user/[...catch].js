const { defineEventHandler } = require('express-filebased-routing')

module.exports = defineEventHandler(() => {
    return 'user not found!'
})
