export default defineEventHandler((req, res) => {
  res.$notFound('user not found')
})
