require('dotenv').config()
const express = require('express')
const favicon = require('serve-favicon')
const createError = require('http-errors')
const path = require('path')
const { setupRouter } = require('express-filebased-routing')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const { applyMiddlewares, errorHandler } = require('./middlewares')

const PORT = process.env.PORT || 3000

async function main() {
    const app = express()

    applyMiddlewares(app)

    // favicon
    app.use(favicon(path.join(process.cwd(), '/public', 'favicon.ico')))

    // view engine setup
    app.set('views', path.join(__dirname, 'views'))
    app.set('view engine', 'ejs')

    app.use(logger('dev'))
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    app.use(cookieParser())
    app.use(express.static(path.join(__dirname, 'public')))

    // routes auto generate
    await setupRouter(app, {
        directory: path.join(__dirname),
        ignoreFiles: ['**/*.ejs'],
        logger: {
            enable: true,
            baseUrl: 'http://127.0.0.1:3500',
        },
    })

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        next(createError(404))
    })

    // error handler
    app.use(errorHandler)

    app.listen(PORT, () => {
        console.log(`➜  Local:   http://localhost:${PORT}`)
    })
}

main()
