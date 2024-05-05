import { defineEventHandler } from 'express-filebased-routing'

export const errorHandler = defineEventHandler((err, req, res) => {
  res.sendError(err.status || 500, err.name, err.message)
})
