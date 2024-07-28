export default defineEventHandler({
  POST(req) {
    return {
      data: req.body,
      message: 'User registered successfully'
    }
  }
})
