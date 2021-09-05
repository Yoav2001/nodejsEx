import express from 'express';
import jwt from 'jsonwebtoken';
import apiErrorHandler from './error/api-error-handler.js';
import ApiError from './error/apiError.js';
import mainRouter from './api/mainRouter.js';
const arr = [4, 5, 6, 7];
const app = express();
app.set('view engine', 'jade');

import dotenv from 'dotenv';
const router = express.Router();

dotenv.config()
    // require('dotenv').config()
    // const express = require('express')
    // const jwt = require('jsonwebtoken')
    // const apiErrorHandler = require('../nodejsEx/error/api-error-handler');
    // const ApiError = require("../nodejsEx/error/apiError")
    // const mainRouter = require("../nodejsEx/api/mainRouter")
app.use(express.json());


app.post('/login', (req, res, next) => {
    // Authenticate User

    const username = req.body.username
    const user = { name: username }

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    console.log(accessToken);
    if (accessToken === null)
        next(new ApiError(401, 'the user isnt connect'))

    res.json({ accessToken: accessToken })
})


function authenticateToken(req, res, next) {


    const authHeader = req.headers['authorization']; //= Bearer TOKEN
    const token = authHeader && authHeader.split(' ')[1] //the token is the second parameter in the arr
    if (token === null) {
        return next(new ApiError(401, 'the user isnt connect'))

    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, PAYLOAD) => {

        req.user = PAYLOAD
        console.log("in authToken")
        next() //move on from the middleWare 
    })
}


app.use(authenticateToken);
app.use("/api", mainRouter);

app.use(apiErrorHandler);

// router.all(methodNotAllowed);
// router
//     .post(`*`)
//     .all(methodNotAllowed);
// app.use((req, res, next) => {

//     const methods = router.stack
//         // Filter for the route that matches the currently matched route
//         .filter(layer => layer.route.path === req.path)[0]
//         .route
//         .methods;

//     console.log(methods);


//     if (!methods[req.method]) methodNotAllowed(req, res, next);
//     else next(new ApiError(404, 'you using in valid req'));

// });


app.listen(3000, function() {
    console.log("listening on port 3000");
});