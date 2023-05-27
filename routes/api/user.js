const express = require('express')
const router = express.Router()
const { joiValidator } = require('@/middlewares')
const { findAllUserByPageDto, findUserByIdDto } = require('@/dto/user.dto')
const userController = require('@/controllers/user.controller')

/* GET users listing. */
router.get('/', joiValidator(findAllUserByPageDto), userController.findAllUserByPage)

router.get('/:uid', joiValidator(findUserByIdDto), userController.findUserById)

module.exports = router
