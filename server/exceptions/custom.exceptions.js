class AccessDeniendError extends Error {
    constructor(message = "You don't have access to operation") {
        super(message);
        this.name = "AccessDeniendError";
        this.info = message;
        this.statusCode = 403;
        // Babel issue. https://github.com/babel/babel/issues/4485.
        this.constructor = AccessDeniendError;
        this.__proto__ = AccessDeniendError.prototype;
    }
}

class CannotFindInDatabaseError extends Error {
    constructor(details = "", message = "Cannot find in db") {
        super(message);
        this.name = "CannotFindInDatabaseError";
        this.info = `${this.message}: ${details}`;
        this.statusCode = 404;
        // Babel issue. https://github.com/babel/babel/issues/4485.
        this.constructor = CannotFindInDatabaseError;
        this.__proto__ = CannotFindInDatabaseError.prototype;
    }
}

module.exports = { 
    AccessDeniendError,
    CannotFindInDatabaseError
};