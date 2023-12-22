const { joiValidator } = require('../../middlewares')
const userService = require('./service')
const { findUserByIdDto } = require('./dto')

exports.GET = [joiValidator(findUserByIdDto), userService.findUserById]
