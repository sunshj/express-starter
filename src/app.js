const createError = require('http-errors')
const express = require('express')
const favicon = require('serve-favicon')
const { autoMount } = require('@sunshj/express-routes-mount')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const { cors, requestElapsedTime, Result, errorHandler } = require('./middlewares')

const app = express()

// sendResult format
app.use(requestElapsedTime)
app.use(Result)

// 设置接口跨域
app.all(/\/api\/*/, cors)

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

// 路由自动挂载
autoMount(app, path.join(__dirname, '/routes'), true)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404))
})

// error handler
app.use(errorHandler)

module.exports = app
