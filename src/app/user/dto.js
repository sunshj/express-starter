import joi from 'joi'
import { joiValidator } from '#utils'

export const findAllUserByPageDto = joiValidator({
  query: joi.object({
    page: joi.number().integer().min(1).required(),
    size: joi.number().integer().min(1).max(20).required(),
    query: joi.string().empty('')
  })
})

export const findUserByIdDto = joiValidator({
  params: joi.object({ id: joi.number().integer().min(1).required() })
})

export const createUserDto = joiValidator({
  body: joi.object({
    username: joi.string().min(2).max(12).required(),
    email: joi.string().email().required(),
    password: joi.string().min(5).max(15).required()
  })
})
