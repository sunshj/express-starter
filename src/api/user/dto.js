const joi = require('joi')
const { createValidator } = require('../../utils')

const page = joi.number().integer().min(1).required()
const size = joi.number().integer().min(1).max(20).required()
const query = joi.string().empty('')
const id = joi.number().integer().min(1).required()

const userName = joi.string().min(2).max(12).required()
const password = joi.string().min(5).max(15).required()

const findAllUserByPage = createValidator({
    query: {
        page,
        size,
        query,
    },
})

const findUserById = createValidator({
    params: { id },
})

const createUser = createValidator({
    body: {
        userName,
        password,
    },
})

module.exports = { findAllUserByPage, findUserById, createUser }
