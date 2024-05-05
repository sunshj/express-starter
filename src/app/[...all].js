import { defineEventHandler } from 'express-filebased-routing'

export default defineEventHandler((req, res) => {
  res.sendNotFound('404 not found')
})
