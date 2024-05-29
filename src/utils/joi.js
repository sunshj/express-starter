import joi from 'joi'

const schemaKeys = ['params', 'query', 'body']

/**
 * @typedef {Partial<Record<'query' | 'body' | 'params', Record<string, import('joi').Schema>>>} Schemas
 * @typedef {import('joi').ValidationOptions & {strict?:boolean}} ValidatorOptions
 * @param {Schemas} schemas
 * @param {ValidatorOptions} [options]
 * @returns {import('express').Handler}
 */
export const joiValidator = (schemas, options = { strict: false }) => {
  const validateOptions = { allowUnknown: true, stripUnknown: true }
  if (!options.strict) {
    const { strict, ...rest } = options
    Object.assign(validateOptions, rest)
  }

  return (req, res, next) => {
    schemaKeys.forEach(key => {
      if (!schemas[key]) return

      const schema = joi.object(schemas[key])
      const { error, value } = schema.validate(req[key], validateOptions)

      if (error) {
        res.$badRequest(error.details[0].message)
        throw error
      } else {
        req[key] = value
      }
    })

    next()
  }
}

/**
 * @param {(joi:import('joi').Root)=>Schemas} schemaFn
 * @param {ValidatorOptions} [options]
 */
export function createDtoValidator(schemaFn, options) {
  return joiValidator(schemaFn(joi), options)
}
