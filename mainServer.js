require('dotenv').config()
const arr = [4, 5, 6, 7];
const express = require('express')
const app = express();
const jwt = require('jsonwebtoken')
const apiErrorHandler = require('../error/api-error-handler');
const ApiError = require("../error/apiError")
const mainRouter = require("../nodejsEx/api/server")


//jwt middleware
app.use("/", authed);

//controller layer
app.use("/api", mainRouter);

app.use(errorHandler);

process.on('unhandledRejection', error => {
    //rarely happens!
    console.log('ah shit I missed an error: ' + error);
});

//listen event
app.listen(3000, function() {
    console.log("listening on localhost:3000");
});