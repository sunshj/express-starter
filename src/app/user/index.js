import { create, findAllByPage } from './service'
import { createUserDto, findAllUserByPageDto } from './dto'

export default {
  GET: [findAllUserByPageDto, findAllByPage],
  POST: [createUserDto, create]
}
