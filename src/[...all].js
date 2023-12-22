exports.GET = (req, res) => {
    res.status(404).send('404 Not Found')
}

exports.ALL = (req, res) => {
    res.status(405).send('405 Method Not Allow')
}
