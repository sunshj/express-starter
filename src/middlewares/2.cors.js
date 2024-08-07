export default eventHandler((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Content-Length, Authorization, Accept, X-Requested-With'
  )
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('Access-Control-Expose-Headers', 'Authorization')

  if (req.method === 'OPTIONS') res.sendStatus(200)
  else next()
})

export const matcher = /\/api\/*/
