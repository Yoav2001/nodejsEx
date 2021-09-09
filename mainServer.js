import express from 'express';
import jwt from 'jsonwebtoken';
import apiErrorHandler from './error/api-error-handler.js';
import ApiError from './error/apiError.js';
import mainRouter from './api/mainRouter.js';
import dotenv from 'dotenv';
import arrayRouter from './api/arrayRouter.js'

const arr = [4, 5, 6, 7];
const app = express();
const router = express.Router();
app.set('view engine', 'jade');
dotenv.config()
app.use(express.json());

router.route("/login")
    .post((req, res, next) => {
        // Authenticate User

        const username = req.body.username
        const user = { name: username }

        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
        if (accessToken === null)
            next(new ApiError(401, 'the user isnt connect'))

        res.json({ accessToken: accessToken })
        next()
    })



// app.post('/login', (req, res, next) => {
//     // Authenticate User

//     const username = req.body.username
//     const user = { name: username }

//     const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
//     if (accessToken === null)
//         next(new ApiError(401, 'the user isnt connect'))

//     res.json({ accessToken: accessToken })
//     next()
// })


function authenticateToken(req, res, next) {


    const authHeader = req.headers['authorization']; //= Bearer TOKEN
    const token = authHeader && authHeader.split(' ')[1] //the token is the second parameter in the arr
    if (token === null) {
        return next(new ApiError(401, 'the user isnt connect'))

    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, PAYLOAD) => {

        req.user = PAYLOAD
        next() //move on from the middleWare 
    })

}

export function authenticateAdmin(req, res, next) {
    const authHeader = req.headers['authorization']; //= Bearer TOKEN
    const token = authHeader && authHeader.split(' ')[1] //the token is the second parameter in the arr
    const decodedToken = jwt.decode(token, {
        complete: true
    });
    const userName = decodedToken.payload.name;
    if (userName === "admin")
        next() //move on from the middleWare 
    else {
        // next(new ApiError(403, 'this user dont have Permissions'))
        res.status(403).json('this user dont have Permissions');
    }
}


app.use(authenticateToken);
app.use((req, res, next) => {
    const allStackRouter = router.stack.concat(mainRouter.stack).concat(arrayRouter.stack)

    if (allStackRouter.filter(layer => { if (layer.route === undefined) { return false } return layer.route.path === req.path })[0] !== undefined) {
        const methods = allStackRouter
            .filter(layer => { if (layer.route === undefined) { return false } return layer.route.path === req.path })[0]
            .route
            .methods;

        console.log("1");
        if (!methods[req.method.toString().toLowerCase()]) return res.status(405).end('bad method');
    } else {
        return res.status(404).end('bad url');
    }
});
app.use("/api", mainRouter);

app.use(apiErrorHandler);





app.listen(8080, function() {
    console.log("listening on port 3000");
});