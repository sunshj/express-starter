const { joiValidator } = require('../middlewares')

/**
 * @typedef {{import('joi').Schema}} Schema
 * @param {{query?:Record<string,Schema>; body?:Record<string,Schema>;params?:Record<string,Schema>;}}  schemas
 * @param {{ import('joi').ValidationOptions}} options
 * @returns {import("express").Handler}
 */
function createValidator(schemas, options) {
    return joiValidator(schemas, options)
}

module.exports = { createValidator }
