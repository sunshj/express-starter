import { defineEventHandler } from 'express-filebased-routing'
import { findById } from './service.js'
import { findUserByIdDto } from './dto.js'

export default defineEventHandler({
  GET: [findUserByIdDto, findById]
})
