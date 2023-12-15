const userController = require('./controller')
const { joiValidator } = require('../../middlewares')
const { findAllUserByPageDto, createUserDto } = require('./dto')

exports.GET = [joiValidator(findAllUserByPageDto), userController.findAllUserByPage]

exports.POST = [joiValidator(createUserDto), userController.create]
