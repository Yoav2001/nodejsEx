"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = apiErrorHandler;
