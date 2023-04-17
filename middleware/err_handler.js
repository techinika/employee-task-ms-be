const err_handler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.json({ error: err.message, stack_trace: err.stack});
}

module.exports = err_handler;