function requestElapsedTime(req, res, next) {
    req.startHrTime = process.hrtime()
    next()
}

function Result(req, res, next) {
    const elapsedHrTime = () => {
        const _elapsedHrTime = process.hrtime(req['startHrTime'])
        return parseFloat((_elapsedHrTime[0] * 1000 + _elapsedHrTime[1] / 1e6).toFixed(2))
    }

    res.sendSuccess = (data) => {
        res.status(200).send({ code: 200, message: '请求成功', data, ms: elapsedHrTime() })
    }

    res.sendFailed = (data) => {
        res.status(200).send({ code: 500, message: '请求错误', data, ms: elapsedHrTime() })
    }

    res.sendValidateFailed = (data) => {
        res.status(401).send({ code: 401, message: '验证失败', data, ms: elapsedHrTime() })
    }

    res.sendErrors = (code, message, data) => {
        res.status(code).send({ code, message, data, ms: elapsedHrTime() })
    }

    next()
}

module.exports = { requestElapsedTime, Result }
