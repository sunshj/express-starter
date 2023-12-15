const joi = require('joi')

const page = joi.number().integer().min(1).required()
const size = joi.number().integer().min(1).max(20).required()
const query = joi.string().empty('')
const id = joi.number().integer().min(1).required()

const userName = joi.string().min(2).max(12).required()
const password = joi.string().min(5).max(15).required()

exports.findAllUserByPageDto = {
    query: {
        page,
        size,
        query,
    },
}

exports.findUserByIdDto = {
    params: { id },
}

exports.createUserDto = {
    body: {
        userName,
        password,
    },
}
