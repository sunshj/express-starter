import { defineEventHandler } from 'express-filebased-routing'

export const ALL = defineEventHandler((req, res) => {
  res.$notFound('user not found')
})
