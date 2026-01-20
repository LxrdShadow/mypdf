function errorHandler(err, req, res, next) {
    const status = err.statusCode || err.status || 500;

    res.status(status).json({
        error: err.message || "Internal Server Error",
        status: status,
    });
}

export default errorHandler;
