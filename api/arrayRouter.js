require('dotenv').config()
const arr = [4, 5, 6, 7];
const express = require('express')
const app = express();
const jwt = require('jsonwebtoken')
const apiErrorHandler = require('../error/api-error-handler');
const ApiError = require("../error/apiError")

const arr = [4, 5, 6, 7];

router.route("/")
    .get((req, res) => {
        res.json(arr)

    })

.post(isAdmin, async(req, res) => {
    const value = req.body.value

    arr.push(value)

    res.json(arr)

})

.delete(isAdmin, async(req, res) => {
    arr.pop();
    res.json(arr)

});


router.route(":index")
    .get((req, res) => {
        const indexInArray = req.params.index;
        const value = arr[indexInArray];
        //||if typeof indexInArray !== 'number'
        if (indexInArray > arr.length)
            next(new ApiError(400, 'error you give in valid correct index'))
        else
            res.json(value)
    })

.put(isAdmin, async(req, res) => {
    const indexInArray = req.params.index;
    const value = req.body.value;
    if (indexInArray > arr.length)
        next(new ApiError(400, 'error you give in valid correct index'))
    else {
        arr[indexInArray] = value;

        res.json(arr)
    }

})

.delete(isAdmin, async(req, res) => {
    const indexInArray = req.params.index;
    const value = 0
    if (indexInArray > arr.length)
        next(new ApiError(400, 'error you give in valid correct index'))
    else {
        arr[indexInArray] = value;

        res.json(arr)
    }

});