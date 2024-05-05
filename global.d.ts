import 'express'

declare global {
  namespace Express {
    interface Response {
      sendSuccess: (data: any) => void
      sendFailed: (message: string) => void
      sendBadRequest: (message: string) => void
      sendNotFound: (message: string) => void
      sendValidateFailed: (message: string) => void
      sendError: (code: number, message: string, data: any) => void
    }
  }
}
