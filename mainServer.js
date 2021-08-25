require('dotenv').config()
const arr = [4, 5, 6, 7];
const express = require('express')
const app = express();
const jwt = require('jsonwebtoken')
const apiErrorHandler = require('../nodejsEx/error/api-error-handler');
const ApiError = require("../nodejsEx/error/apiError")
const mainRouter = require("../nodejsEx/api/mainRouter")
app.use(express.json());




app.post('/login', (req, res, next) => {
    // Authenticate User

    const username = req.body.username
    const user = { name: username }

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    if (accessToken === null)
        next(new ApiError(401, 'the user isnt connect'))

    res.json({ accessToken: accessToken })
})


function authenticateToken(req, res, next) {
    // const path = url.parse(req.url).path;
    // res.json(path)

    const authHeader = req.headers['authorization']; //= Bearer TOKEN
    const token = authHeader && authHeader.split(' ')[1] //the token is the second parameter in the arr
    if (token === null) {
        return next(new ApiError(401, 'the user isnt connect'))
            // res.status(500).json('something went wrong');

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
        // next(new ApiError(403, 'this user dont have Permissions'))
        res.status(500).json('something went wrong');

    }
    // res.sendStatus(401);

}



// app.use(bodyparser.json());

//jwt middleware
// app.use("/", authed);s

//controller layer
app.use(authenticateToken);
// app.use(authenticateAdmin)
app.use("/api", mainRouter);
app.use(apiErrorHandler);

// app.use(errorHandler);

// process.on('unhandledRejection', error => {
//     //rarely happens!
//     console.log('ah shit I missed an error: ' + error);
// });

//listen event
// module.exports = authenticateAdmin;
app.listen(3000, function() {
    console.log("listening on port 3000");
});