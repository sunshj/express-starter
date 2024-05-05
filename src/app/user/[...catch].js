import { defineEventHandler } from 'express-filebased-routing'

export const ALL = defineEventHandler((req, res) => {
  res.sendNotFound('user not found')
})
