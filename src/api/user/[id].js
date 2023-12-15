const { joiValidator } = require('../../middlewares')
const userController = require('./controller')
const { findUserByIdDto } = require('./dto')

exports.GET = [joiValidator(findUserByIdDto), userController.findUserById]
