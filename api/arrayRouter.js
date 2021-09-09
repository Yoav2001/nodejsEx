// require('dotenv').config()
// const arr: number[] = [4, 5, 6, 7];
const arr = [4, 5, 6, 7]
import express from 'express';
import { authenticateAdmin } from '../mainServer.js';

import ApiError from '../error/apiError.js';
const router = express.Router();
//const app = express();

//app.use(express.json());


router.route("/")
    .get((req, res) => {
        res.json(arr)

    })


.post(authenticateAdmin, (req, res, next) => {
    const value = req.body.value
    if (typeof value !== "number") {
        // res.status(403).json('this user dont have Permissions');
        return next(new ApiError(400, 'error you give inValid value to put in the arr'))
            //שמתי retrun כי בלי זה קורס
            // רשמתי בווצאפ למה
            // .https://www.codementor.io/@oparaprosper79/understanding-node-error-err_http_headers_sent-117mpk82z8
    } else {
        arr.push(value)
            // next()//אם שם את זה פה זה לא עושה כלום האם זה משנה?
    }

    res.json(arr)

})


.delete(authenticateAdmin, (req, res) => {
        arr.pop();
        res.json(arr)

    })
    .all((req, res) => {
        res.status(405).send();
    });



router.route("/:index")
    .get((req, res, next) => {
        const indexInArray = req.params.index;


        if (isNaN(indexInArray) || indexInArray >= arr.length) {
            next(new ApiError(400, 'error you give inValid index'))
        } else
            res.json(arr[indexInArray])
    })

.put(authenticateAdmin, (req, res, next) => {
    const indexInArray = req.params.index;
    const value = req.body.value;
    if (isNaN(indexInArray) || isNaN(value) || indexInArray >= arr.length)
        next(new ApiError(400, 'error you give in inValid index/value '))
    else {
        arr[indexInArray] = value;

        res.json(arr)
    }
})

.delete(authenticateAdmin, (req, res, next) => {
    const indexInArray = req.params.index;
    const value = 0
    if (isNaN(indexInArray) || indexInArray >= arr.length)
        next(new ApiError(400, 'error you give in inValid index'))
    else {
        arr[indexInArray] = value;
        res.json(arr)
    }
});





// if (router.stack.filter(layer => {
//         if (layer.route === undefined) { return false }
//         return layer.route.path === req.path


// )



export default router;

//module.exports = router