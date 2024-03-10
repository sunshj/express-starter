const userService = require('./service')
const userDtoValidator = require('./dto')
const { defineEventHandler } = require('express-filebased-routing')

module.exports = defineEventHandler({
    GET: [userDtoValidator.findAllUserByPage, userService.findAllUserByPage],
    POST: [userDtoValidator.createUser, userService.create],
})
