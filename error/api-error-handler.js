//  const ApiError = require('./apiError');
import ApiError from '../error/apiError.js';
// import ApiError from './apiError';

function apiErrorHandler(err, req, res, next) {
    // in prod, don't use console.log or console.err because
    // it is not async
    console.error(err);


    if (err.constructor.name === "ApiError") {
        res.status(err.code).json(err.message);
        return;
    }

    res.status(500).json('something went wrong');
}

//  module.exports = apiErrorHandler;
export default apiErrorHandler;