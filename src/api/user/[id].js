const userService = require('./service')
const userDtoValidator = require('./dto')
const { defineEventHandler } = require('express-filebased-routing')

module.exports = defineEventHandler({
    GET: [userDtoValidator.findUserById, userService.findUserById],
})
