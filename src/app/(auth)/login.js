export default defineEventHandler({
  POST(req) {
    return {
      data: req.body,
      message: 'Login successful'
    }
  }
})
