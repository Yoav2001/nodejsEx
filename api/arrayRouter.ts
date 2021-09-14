// require('dotenv').config()
 const arr: number[] = [4, 5, 6, 7];
// const arr = [4, 5, 6, 7]
import express from 'express';
import { authenticateAdmin } from '../logic/auth';
import ApiError from '../error/apiError.js';
const router = express.Router();


router.route("/")
    .get((req, res) => {
        res.json(arr)

    })


.post(authenticateAdmin, (req, res, next) => {
    const value = req.body.value
    if (typeof value !== "number") {
        return next(new ApiError(400, 'error you give inValid value to put in the arr'))
      
    } else {
        arr.push(value)
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
        const indexInArray : number =parseInt(req.params.index);


        if (isNaN(indexInArray) || indexInArray >= arr.length) {
            next(new ApiError(400, 'error you give inValid index'))
        } else
            res.json(arr[indexInArray])
    })

.put(authenticateAdmin, (req, res, next) => {
    const indexInArray : number =parseInt(req.params.index);
    const value:number =parseInt(req.body.value) ;
    if (isNaN(indexInArray) || isNaN(value) || indexInArray >= arr.length)
        next(new ApiError(400, 'error you give in inValid index/value '))
    else {
        arr[indexInArray] = value;

        res.json(arr)
    }
})

.delete(authenticateAdmin, (req, res, next) => {
    const indexInArray : number =parseInt(req.params.index);
    const value = 0
    if (isNaN(indexInArray) || indexInArray >= arr.length)
        next(new ApiError(400, 'error you give in inValid index'))
    else {
        arr[indexInArray] = value;
        res.json(arr)
    }
});








export default router;

//module.exports = router



      //שמתי retrun כי בלי זה קורס
            // רשמתי בווצאפ למה
            // .https://www.codementor.io/@oparaprosper79/understanding-node-error-err_http_headers_sent-117mpk82z8