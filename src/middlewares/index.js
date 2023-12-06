const cors = require('./cors')
const errorHandler = require('./error-handler')
const joiValidator = require('./joi-validator')
const { requestElapsedTime, PrettyResult } = require('./send-result')

const applyMiddlewares = (app) => {
    app.use(requestElapsedTime)
    app.use(PrettyResult)
    app.all(/\/api\/*/, cors)
}

module.exports = {
    applyMiddlewares,
    errorHandler,
    joiValidator,
}
