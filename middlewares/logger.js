const logger = (req, res, next) => {
    console.log(`Request to ${req.path} using method ${req.method} at ${new Date().toUTCString()}`);
    next();
};

module.exports = logger;