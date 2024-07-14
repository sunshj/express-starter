import 'dotenv/config'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import favicon from 'serve-favicon'
import { setupRouter } from 'setup-router'
import { presetExpress } from 'setup-router/preset-express'
import logger from 'morgan'
import { cors, prettyResult, requestElapsedTime } from '#middlewares'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()

async function main() {
  // middlewares
  app.use(requestElapsedTime)
  app.use(prettyResult)
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

  await setupRouter({
    directory: path.join(__dirname, './app'),
    dotNesting: true,
    plugins: [
      {
        id: 'before-route-mount',
        extendRoutes(ctx, routes) {
          app.get(
            '/__routes',
            eventHandler(() => routes)
          )
        }
      },
      presetExpress(app, {
        prefixes: {
          '/api': ['src/app/user/**']
        },
        logger: {
          baseUrl: `http://127.0.0.1:${app.get('port')}`
        }
      })
    ]
  })

  app.listen(app.get('port'), () => {
    console.log(`➜  Local:   http://127.0.0.1:${app.get('port')}`)
  })
}

main()
