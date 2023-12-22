const userService = require('./service')
const { joiValidator } = require('../../middlewares')
const { findAllUserByPageDto, createUserDto } = require('./dto')

exports.GET = [joiValidator(findAllUserByPageDto), userService.findAllUserByPage]

exports.POST = [joiValidator(createUserDto), userService.create]
