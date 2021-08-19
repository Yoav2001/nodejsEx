require('dotenv').config()
const arr = [4, 5, 6, 7];
const express = require('express')
const app = express();
const jwt = require('jsonwebtoken')
const apiErrorHandler = require('./error/api-error-handler');
const ApiError = require("./error/apiError")
    // import { ApiError } from "./error/apiError"
app.use(express.json())

app.post('/login', (req, res) => {
    // Authenticate User

    const username = req.body.username
    const user = { name: username }

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    if (accessToken === null)
        apiErrorHandler(new ApiError(401, 'the user isnt connect'), req, res)


    res.json({ accessToken: accessToken })

    // // apiErrorHandler(new ApiError(200, `the request Succeeded `), req, res)

    // res.status(200).json('the req Succeeded');

})

// the middleWare needs to be after the login POST
app.use(authenticateToken);
app.use(apiErrorHandler);



// function validIndex(index) {
//     middleWareIndexValid(req, res, next) {

//         if (indexInArray != null && indexInArray > arr.length) {
//             return next(new ApiError(401, 'error you give in correct index'))
//         }
//     }
// }
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']; //= Bearer TOKEN
    const token = authHeader && authHeader.split(' ')[1] //the token is the second parameter in the arr
    if (token == null) {
        return next(new ApiError(401, 'the user isnt connect'))
    }

    const indexInArray = req.params.index;
    res.json(indexInArray)
    console.log(indexInArray)
    if (indexInArray != null && indexInArray > arr.length) {
        return next(new ApiError(401, 'error you give in correct index'))
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, PAYLOAD) => {
        // console.log(err)
        if (err) return res.sendStatus(403)
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
    if (userName.indexOf("admin") !== -1)
        next() //move on from the middleWare 

    next(new ApiError(403, 'this user dont have Permissions'))
        // res.sendStatus(401);

}


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


app.get("/array", (req, res) => {
    res.json(arr)
});
app.get("/array/:index", (req, res) => {
    const indexInArray = req.params.index;
    const value = arr[indexInArray];
    // if (indexInArray > arr.length)
    //     return apiErrorHandler(new ApiError(400, 'error you give in correct index'))

    res.json(value)
});

app.post("/array", authenticateAdmin, (req, res) => {
    const value = req.body.value
    arr.push(value)

    res.json(arr)

});

app.put("/array/:index", authenticateAdmin, (req, res) => {
    const indexInArray = req.params.index;
    const value = req.body.value;
    arr[indexInArray] = value;
    res.json(arr)

});

app.delete("/array", authenticateAdmin, (req, res) => {
    arr.pop();
    res.json(arr)

});
app.delete("/array/:index", authenticateAdmin, (req, res) => {
    const indexInArray = req.params.index;
    const value = 0
    if (indexInArray > arr.length)

        arr[indexInArray] = value;
    res.json(arr)
});


// app.post('/token', (req, res) => {
//     const refreshToken = req.body.token
//     if (refreshToken == null) return res.sendStatus(401)
//     if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
//     jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
//         if (err) return res.sendStatus(403)
//         const accessToken = generateAccessToken({ name: user.name })
//         res.json({ accessToken: accessToken })
//     })
// })


function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
}
app.listen(3000)