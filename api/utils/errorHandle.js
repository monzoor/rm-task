class ErrorHandler extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

const handleError = (err, res) => {
    const { statusCode, message } = err;
    if (!statusCode) {
        console.log('Error', err);
        res.status(statusCode).json({
            status: 'error',
            statusCode: 500,
            message: 'Somethig went wrong',
        });
    }
    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message,
    });
};

module.exports = {
    ErrorHandler,
    handleError,
};
