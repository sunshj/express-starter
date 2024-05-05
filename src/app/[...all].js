import { defineEventHandler } from 'express-filebased-routing'

export default defineEventHandler((req, res) => {
  res.$notFound('404 not found')
})
