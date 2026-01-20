function errorHandler(err, req, res, next) {
    const status = err.statusCode || err.status || 500;
    console.error(err);

    res.status(status).json({
        error: err.message || "Internal Server Error",
    });
}

export default errorHandler;
