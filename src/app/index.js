import { defineEventHandler } from 'express-filebased-routing'

export const GET = defineEventHandler((req, res) => {
  res.render('index', { title: 'Hello Express!', msg: 'Welcome to Express.js' })
})
