import { defineEventHandler } from 'express-filebased-routing'
import { create, findAllByPage } from './service.js'
import { createUserDto, findAllUserByPageDto } from './dto.js'

export default defineEventHandler({
  GET: [findAllUserByPageDto, findAllByPage],
  POST: [createUserDto, create]
})
