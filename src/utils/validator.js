import { createJoiValidator, extractJoiError } from 'express-validate-kit'

export const joiValidator = createJoiValidator({
  statusCode: 200,
  errorResponse(error) {
    return {
      code: 400,
      message: extractJoiError(error)
    }
  }
})
