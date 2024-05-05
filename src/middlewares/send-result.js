export function requestElapsedTime(req, res, next) {
  req.startHrTime = process.hrtime()
  next()
}

export function PrettyResult(req, res, next) {
  const elapsedHrTime = () => {
    const _elapsedHrTime = process.hrtime(req.startHrTime)
    return Number.parseFloat((_elapsedHrTime[0] * 1000 + _elapsedHrTime[1] / 1e6).toFixed(2))
  }

  res.sendSuccess = data => {
    res.status(200).send({ code: 200, message: '请求成功', data, ms: elapsedHrTime() })
  }

  res.sendFailed = message => {
    res.status(200).send({ code: 500, message, data: null, ms: elapsedHrTime() })
  }

  res.sendBadRequest = message => {
    res.status(400).send({ code: 500, message, data: null, ms: elapsedHrTime() })
  }

  res.sendValidateFailed = message => {
    res.status(401).send({ code: 401, message, data: null, ms: elapsedHrTime() })
  }

  res.sendNotFound = message => {
    res.status(404).send({ code: 404, message, data: null, ms: elapsedHrTime() })
  }

  res.sendError = (code, message, data) => {
    res.status(code).send({ code, message, data, ms: elapsedHrTime() })
  }

  next()
}
