class HttpHelper {
    static invokeChain(promise, response) {
        promise()
            .then(data => { 
                response.status(200).json(data)
            })
            .catch(error => { 
                const statusCode = error && error.statusCode || 500;
                response.status(statusCode).json({message: error.message});
            });
    }
}

module.exports = HttpHelper;