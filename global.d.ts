import 'express'

declare global {
  namespace Express {
    interface Response {
      /** 200 */
      $success: (data: any) => void
      /** 500 */
      $failed: (message: string) => void
      /** 400 */
      $badRequest: (message: string) => void
      /** 404 */
      $notFound: (message: string) => void
      /** custom error */
      $error: (code: number, message: string, data: any) => void
    }
  }
}
