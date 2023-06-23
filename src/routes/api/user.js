const express = require('express')
const router = express.Router()
const { joiValidator } = require('@/middlewares')
const { findAllUserByPageDto, findUserByIdDto, createUserDto } = require('@/dto/user.dto')
const UserController = require('@/controllers/user.controller')

/* GET users listing. */
router.get('/', joiValidator(findAllUserByPageDto), UserController.findAllUserByPage)

router.get('/:uid', joiValidator(findUserByIdDto), UserController.findUserById)

router.post('/', joiValidator(createUserDto), UserController.create)

module.exports = router
