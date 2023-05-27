const joi = require('joi')

const page = joi.number().integer().min(1).required()
const size = joi.number().integer().min(1).max(20).required()
const query = joi.string().empty('')
const uid = joi.number().integer().min(1).required()

exports.findAllUserByPageDto = {
    query: {
        page,
        size,
        query,
    },
}

exports.findUserByIdDto = {
    params: { uid },
}
