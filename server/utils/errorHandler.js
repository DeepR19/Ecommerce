// here we inherit Error class into handler

class ErrorHandler extends Error{
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;

        // here we update statusCode and message in Error Stack
        // update the constructor details in stack
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ErrorHandler