import  express from 'express';
import jwt from 'jsonwebtoken';
import apiErrorHandler from './error/api-error-handler.js';
import ApiError from './error/apiError.js';
import mainRouter from './api/mainRouter.js';
import dotenv from 'dotenv';
import arrayRouter from './api/arrayRouter.js'
import { User } from './logic/userModule';
import { authenticateToken } from './logic/auth.js';

const arr = [4, 5, 6, 7];
const jwtSecret: string = "yalh beitar";
const app = express();
const router = express.Router();
app.set('view engine', 'jade');
dotenv.config()
app.use(express.json());

router.route("/login")
    .post((req, res, next) => {
        // Authenticate User

         const user:User={id:req.body.id,userName:req.body.username,password:req.body.password,isAdmin:false};
        // console.log(user.id);
        // const user:User={id:"1",userName:"dasd",password:"sadsa",isAdmin:false}
        const token = jwt.sign(user, jwtSecret, {algorithm:'ES256'
        })
        res.send();

        res.json(JSON.stringify(token))
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


app.use(authenticateToken);

app.use("/api", mainRouter);

 //app.use(apiErrorHandler);





app.listen(3000, function() {
    console.log("listening on port 3000");
});






//midlaear 405 error


// app.use((req:express.Request, res:express.Response, next:express.NextFunction) => {
//     const allStackRouter = router.stack.concat(mainRouter.stack).concat(arrayRouter.stack)

//     if (allStackRouter.filter(layer => { if (layer.route === undefined) { return false } return layer.route.path === req.path })[0] !== undefined) {
//         const methods = allStackRouter
//             .filter(layer => { if (layer.route === undefined) { return false } return layer.route.path === req.path })[0]
//             .route
//             .methods;

//         console.log("1");
//         if (!methods[req.method.toString().toLowerCase()]) return res.status(405).end('bad method');
//     } else {
//         return res.status(404).end('bad url');
//     }
// });