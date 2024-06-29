const { stack } = require("../routes/userRouter")

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        // gives the details of the file in which error occurred
        stack: err.stack,
    });
};

module.exports = errorHandler;