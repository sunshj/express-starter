// @ts-check
import 'dotenv/config'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import favicon from 'serve-favicon'
import { setupRouter } from 'setup-router'
import { presetExpress } from 'setup-router/preset-express'
import logger from 'morgan'
import { setupMiddleware } from 'setup-middleware'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()

async function main() {
  // middlewares
  const middlewares = await setupMiddleware({
    directory: path.join(__dirname, 'middlewares'),
    register: (matcher, handler) => app.all(matcher, handler),
    logger: true
  })

  // favicon
  app.use(favicon(path.join(process.cwd(), '/public', 'favicon.ico')))

  app.set('views', path.join(__dirname, 'views'))
  app.set('view engine', 'ejs')
  app.set('port', process.env.PORT || 3500)

  app.use(logger('dev'))
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(express.static(path.join(process.cwd(), '/public')))

  await setupRouter({
    directory: path.join(__dirname, 'app'),
    dotNesting: true,
    plugins: [
      presetExpress(app, {
        prefixes: {
          '/api': ['src/app/user/**']
        },
        logger: {
          baseUrl: `http://127.0.0.1:${app.get('port')}`
        },
        register: {
          beforeMount(routes) {
            app.get(
              '/__routes',
              eventHandler(() => ({
                routes,
                middlewares: middlewares.map(v => ({ ...v, matcher: v.matcher.toString() }))
              }))
            )
          }
        }
      })
    ]
  })

  app.listen(app.get('port'), () => {
    console.log(`➜  Local:   http://127.0.0.1:${app.get('port')}`)
  })
}

main()
