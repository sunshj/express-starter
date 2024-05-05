import joi from 'joi'

const schemaKeys = ['params', 'query', 'body']

/**
 * @param {Record<string, import('joi').Schema>} schemas
 * @param {import('joi').ValidationOptions} options
 * @returns {import('express').Handler}
 */
export const joiValidator = (schemas, options = { strict: false }) => {
  let validateOptions = { allowUnknown: true, stripUnknown: true }
  if (!options.strict) {
    const { strict, ...rest } = options
    validateOptions = { allowUnknown: true, stripUnknown: true, ...rest }
  }

  return (req, res, next) => {
    schemaKeys.forEach(key => {
      if (!schemas[key]) return

      const schema = joi.object(schemas[key])
      const { error, value } = schema.validate(req[key], validateOptions)

      if (error) {
        res.sendBadRequest(error.details[0].message)
        throw error
      } else {
        req[key] = value
      }
    })

    next()
  }
}

/**
 * @typedef {{import('joi').Schema}} Schema
 * @param {(joi:import('joi').Root)=>{query?:Record<string,Schema>; body?:Record<string,Schema>;params?:Record<string,Schema>;}} schemaFn
 * @param {import('joi').ValidationOptions } options
 */
export function createDtoValidator(schemaFn, options) {
  return joiValidator(schemaFn(joi), options)
}
