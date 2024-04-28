const testEndpoint = (req, res, next) => {
    hello_world = 'Hello world!'
    res.status(200).send({msg: hello_world})
}

module.exports = {
    testEndpoint
}