module.exports = (req, res, next) => {
    req.query = require('url').parse(req.url, true).query;
    return next()
}