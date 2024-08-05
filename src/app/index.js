export const GET = eventHandler((req, res) => {
  res.render('index', { title: 'Hello Express!', msg: 'Welcome to Express.js' })
})
