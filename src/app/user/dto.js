import { createDtoValidator } from '#utils'

export const findAllUserByPageDto = createDtoValidator(joi => ({
  query: {
    page: joi.number().integer().min(1).required(),
    size: joi.number().integer().min(1).max(20).required(),
    query: joi.string().empty('')
  }
}))

export const findUserByIdDto = createDtoValidator(joi => ({
  params: { id: joi.number().integer().min(1).required() }
}))

export const createUserDto = createDtoValidator(joi => ({
  body: {
    username: joi.string().min(2).max(12).required(),
    email: joi.string().email().required(),
    password: joi.string().min(5).max(15).required()
  }
}))
