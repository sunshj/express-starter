export default eventHandler((req, res, next) => {
  req.startHrTime = process.hrtime()

  const getElapsedTime = () => {
    const _elapsedHrTime = process.hrtime(req.startHrTime)
    return Number.parseFloat((_elapsedHrTime[0] * 1000 + _elapsedHrTime[1] / 1e6).toFixed(2))
  }

  res.$success = data => {
    res.status(200).send({ code: 200, message: '请求成功', data, ms: getElapsedTime() })
  }

  res.$failed = message => {
    res.status(500).send({ code: 500, message, data: null, ms: getElapsedTime() })
  }

  res.$badRequest = message => {
    res.status(400).send({ code: 400, message, data: null, ms: getElapsedTime() })
  }

  res.$notFound = message => {
    res.status(404).send({ code: 404, message, data: null, ms: getElapsedTime() })
  }

  res.$error = (code, message, data) => {
    res.status(code).send({ code, message, data, ms: getElapsedTime() })
  }

  next()
})
