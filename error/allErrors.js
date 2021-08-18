const ApiError = require('../error/ApiError');

class typeError {
    tweet(req, res, next) {
        const { msg } = req.body;
        if (!msg) {
            next(new ApiError(400, 'msg field is required and must be non blank'));
            return;
        }
        res.sendStatus(201);
    }
}

module.exports = new typeError();