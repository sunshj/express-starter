const express = require('express')
const router = express.Router()
const JoiValidator = require('@/middlewares/joiValidator')
const { findAllUserByPageDto, findUserByIdDto } = require('@/dto/user.dto')
const userController = require('@/controllers/user.controller')

/* GET users listing. */
router.get('/', JoiValidator(findAllUserByPageDto), userController.findAllUserByPage)

router.get('/:uid', JoiValidator(findUserByIdDto), userController.findUserById)

module.exports = router
