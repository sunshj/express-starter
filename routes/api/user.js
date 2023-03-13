const express = require('express')
const router = express.Router()
const JoiValidator = require('@/middlewares/joiValidator')
const { findAllUserByPageSchema, findUserByIdSchema } = require('@/schemas/userSchema')
const { findAllUserByPage, findUserById } = require('@/controllers/user.controller')

/* GET users listing. */
router.get('/', JoiValidator(findAllUserByPageSchema), findAllUserByPage)

router.get('/:uid', JoiValidator(findUserByIdSchema), findUserById)

module.exports = router
