function errorHandlerMiddleware(err, req, res, _next) {
    res.sendErrors(err.status || 500, err.name, err.message)
}

module.exports = errorHandlerMiddleware
