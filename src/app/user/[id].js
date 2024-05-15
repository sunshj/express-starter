import { findById } from './service'
import { findUserByIdDto } from './dto'

export default defineEventHandler({
  GET: [findUserByIdDto, findById]
})
