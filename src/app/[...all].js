export default defineEventHandler((req, res) => {
  res.$notFound('404 not found')
})
