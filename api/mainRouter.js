require('dotenv').config()
const arr = [4, 5, 6, 7];
const express = require('express')
const app = express();
const jwt = require('jsonwebtoken')
const apiErrorHandler = require('../error/api-error-handler');
const ApiError = require("../error/apiError")

const arrayRouter = require("./arrayRouter")
const userRouter = require("./userRouter")

// app.use(bodyparser.json());

app.use(express.json());



app.get("/", (req, res) => {
    const date = new Date().toJSON().slice(0, 10);

    res.json({
        msg: "Hello " + req.user.name + " today is " + date,
    });
});
app.get("/echo", (req, res) => {

    const msg = req.query.msg;
    res.json({
        echo: "The message is " + msg
    })
});


app.use("/array/", arrayRouter);

// export default app;
module.exports = app;