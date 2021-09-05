// require('dotenv').config()


import express from 'express';
import arrayRouter from './arrayRouter.js'
const app = express();
const router = express.Router();

const arr = [4, 5, 6, 7];
// const express = require('express')
// const app = express();
// const jwt = require('jsonwebtoken')
// const apiErrorHandler = require('../error/api-error-handler');
// const ApiError = require("../error/apiError")

// const arrayRouter = require("../api/arrayRouter")

// app.use(bodyparser.json());
app.set('view engine', 'jade');

app.use(express.json());

router.route("/")
    .get((req, res) => {
        const date = new Date().toJSON().slice(0, 10);

        res.json({
            msg: "Hello " + req.user.name + " today is " + date,
        });
    })


router.route("/echo")
    .get((req, res) => {
        const msg = req.query.msg;
        res.json({
            echo: "The message is " + msg
        })
    })

// app.get("/", (req, res) => {
//     const date = new Date().toJSON().slice(0, 10);

//     res.json({
//         msg: "Hello " + req.user.name + " today is " + date,
//     });
// });
// app.get("/echo", (req, res) => {

//     const msg = req.query.msg;
//     res.json({
//         echo: "The message is " + msg
//     })
// });

router.use("/array/", arrayRouter)
    // app.use("/array/", arrayRouter);

export default router;