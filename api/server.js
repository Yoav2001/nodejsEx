require('dotenv').config()
const arr = [4, 5, 6, 7];
const express = require('express')
const app = express();
const jwt = require('jsonwebtoken')
const apiErrorHandler = require('../error/api-error-handler');
const ApiError = require("../error/apiError")
    // import userRouter from './userRouting.js';
const userRouter = require("./userRouter")

// import { ApiError } from "./error/apiError"
app.use(express.json())

app.post('/login', (req, res, next) => {
        // Authenticate User

        const username = req.body.username
        const user = { name: username }

        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
        if (accessToken === null)
            next(new ApiError(401, 'the user isnt connect'))

        res.json({ accessToken: accessToken })
    })
    // app.use("/users/", userRouter);


// the middleWare needs to be after the login POST
app.use(authenticateToken);
// app.use(apiErrorHandler);


const url = require('url');

function authenticateToken(req, res, next) {
    // const path = url.parse(req.url).path;
    // res.json(path)
    // if(path!=)
    const authHeader = req.headers['authorization']; //= Bearer TOKEN
    const token = authHeader && authHeader.split(' ')[1] //the token is the second parameter in the arr
    if (token === null) {
        return next(new ApiError(401, 'the user isnt connect'))
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, PAYLOAD) => {
        // console.log(err)
        // if (err) return res.sendStatus(403)
        req.user = PAYLOAD
        console.log("in authToken")
        next() //move on from the middleWare 
    })
}

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
        next(new ApiError(403, 'this user dont have Permissions'))

    }
    // res.sendStatus(401);

}




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


app.get("/array", (req, res) => {
    res.json(arr)
});
app.get("/array/:index", (req, res, next) => {
    const indexInArray = req.params.index;
    const value = arr[indexInArray];
    //||if typeof indexInArray !== 'number'
    if (indexInArray > arr.length)
        next(new ApiError(400, 'error you give in valid correct index'))
    else
        res.json(value)

});


app.post("/array", authenticateAdmin, (req, res) => {
    const value = req.body.value

    arr.push(value)

    res.json(arr)

});

app.put("/array/:index", authenticateAdmin, (req, res, next) => {
    const indexInArray = req.params.index;
    const value = req.body.value;
    if (indexInArray > arr.length)
        next(new ApiError(400, 'error you give in valid correct index'))
    else {
        arr[indexInArray] = value;

        res.json(arr)
    }
});

app.delete("/array", authenticateAdmin, (req, res) => {
    arr.pop();
    res.json(arr)

});
app.delete("/array/:index", authenticateAdmin, (req, res, next) => {
    const indexInArray = req.params.index;
    const value = 0
    if (indexInArray > arr.length)
        next(new ApiError(400, 'error you give in valid correct index'))
    else {
        arr[indexInArray] = value;

        res.json(arr)
    }




});


//The 404 Route (ALWAYS Keep this as the last route)
// app.get('*', function(req, res, next) {
//     // next(new ApiError(404, 'error you give in valid correct index'))
//     res.send('what???', 404);
// })

app.use(apiErrorHandler);
app.use(function(req, res) {
    // apiErrorHandler(new ApiError(404, 'ex'))

    res.status(404).send("Sorry can't find that!")
});

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
}
app.listen(3000)