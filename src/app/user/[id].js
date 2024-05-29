import { findById } from './service'
import { findUserByIdDto } from './dto'

export default {
  GET: [findUserByIdDto, findById]
}
