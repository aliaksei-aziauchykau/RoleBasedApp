
const logger = require("./logger.js");

const logDecorator = (asyncFunc, funcName) => {
        const decorated = (...args) => {
            const promise = asyncFunc(...args);

            promise
                .then(data => logger.info(data, funcName))
                .catch(error => {
                    logger.error({ 
                        stack: error && error.stack || "",
                        name: error && error.name || "",
                        message: error && error.message || "",
                        error: error
                    }, funcName);
            });

            return promise;
        }

        return decorated;
}

module.exports = {
    logDecorator
}