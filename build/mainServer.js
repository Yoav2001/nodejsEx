"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mainRouter_1 = __importDefault(require("./api/mainRouter"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_js_1 = require("./logic/auth.js");
const arr = [4, 5, 6, 7];
const jwtSecret = "yalh beitar";
const app = (0, express_1.default)();
const router = express_1.default.Router();
app.set('view engine', 'jade');
dotenv_1.default.config();
app.use(express_1.default.json());
router.route("/login")
    .post((req, res, next) => {
    // Authenticate User
    console.log("tomer gey");
    const user = { id: req.body.id, userName: req.body.userName, password: req.body.password, isAdmin: false };
    // console.log(user.id);
    // const user:User={id:"1",userName:"dasd",password:"sadsa",isAdmin:false}
    const token = jsonwebtoken_1.default.sign(user, jwtSecret);
    if (token === undefined || token === null)
        res.status(403).json('this user dont have Permissions');
    res.json(JSON.stringify(token));
});
app.use(router);
app.use("/api", mainRouter_1.default);
app.use(auth_js_1.authed);
//app.use(apiErrorHandler);
app.listen(3000, function () {
    console.log("listening on port 3000");
});
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
