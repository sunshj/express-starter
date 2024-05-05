import 'dotenv/config'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import favicon from 'serve-favicon'
import createError from 'http-errors'
import { setupRouter } from 'express-filebased-routing'
import logger from 'morgan'
import { cors } from './middlewares/cors.js'
import { errorHandler } from './middlewares/error-handler.js'
import { PrettyResult, requestElapsedTime } from './middlewares/send-result.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()

async function main() {
  // middlewares
  app.use(requestElapsedTime)
  app.use(PrettyResult)
  app.all(/\/api\/*/, cors)

  // favicon
  app.use(favicon(path.join(process.cwd(), '/public', 'favicon.ico')))

  app.set('views', path.join(__dirname, 'views'))
  app.set('view engine', 'ejs')
  app.set('port', process.env.PORT || 3500)

  app.use(logger('dev'))
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(express.static(path.join(__dirname, 'public')))

  // routes auto generate
  await setupRouter(app, {
    directory: path.join(__dirname, './app'),
    globalPrefix: {
      '/api': ['src/app/user/**']
    },
    logger: {
      enable: true,
      baseUrl: `http://127.0.0.1:${app.get('port')}`
    }
  })

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    next(createError(404))
  })

  // error handler
  app.use(errorHandler)

  app.listen(app.get('port'), () => {
    console.log(`➜  Local:   http://127.0.0.1:${app.get('port')}`)
  })
}

main()
