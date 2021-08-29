require('dotenv').config()
const arr = [4, 5, 6, 7];
// const { Router } = require('express');
const express = require('express')
const router = express.Router();

const app = express();
const jwt = require('jsonwebtoken')
const apiErrorHandler = require('../error/api-error-handler');
const ApiError = require("../error/apiError")
    // import { authenticateAdmin } from '../mainServer'
app.use(express.json());

function authenticateAdmin(req, res, next) {
    const authHeader = req.headers['authorization']; //= Bearer TOKEN
    const token = authHeader && authHeader.split(' ')[1] //the token is the second parameter in the arr
    const decodedToken = jwt.decode(token, {
        complete: true
    });

    const userName = decodedToken.payload.name;
    console.log(userName);
    if (userName === "admin")
        next() //move on from the middleWare 
    else {
        // next(new ApiError(403, 'this user dont have Permissions'))
        res.status(500).json('something went wrong');

    }
    // res.sendStatus(401);

}


router.route("/")
    .get((req, res) => {
        res.json(arr)

    })

.post(authenticateAdmin, (req, res) => {
    const value = req.body.value

    arr.push(value)

    res.json(arr)

})

.delete((req, res) => {
    arr.pop();
    res.json(arr)

});


router.route("/:index")
    .get((req, res, next) => {
        const indexInArray = req.params.index;

        console.log(isNaN(indexInArray));

        if (isNaN(indexInArray) || indexInArray >= arr.length) {
            next(new ApiError(400, 'error you give inValid index'))
        } else
            res.json(arr[indexInArray])
    })

.put((req, res, next) => {
    const indexInArray = req.params.index;
    const value = req.body.value;
    if (isNaN(indexInArray) || indexInArray >= arr.length)
        next(new ApiError(400, 'error you give in inValid index'))
    else {
        arr[indexInArray] = value;

        res.json(arr)
    }

})

.delete((req, res, next) => {
    const indexInArray = req.params.index;
    const value = 0
    if (isNaN(indexInArray) || indexInArray >= arr.length)
        next(new ApiError(400, 'error you give in inValid index'))
    else {
        arr[indexInArray] = value;

        res.json(arr)
    }

});

// export default router;
module.exports = router