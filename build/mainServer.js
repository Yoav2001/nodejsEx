"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const api_error_handler_js_1 = __importDefault(require("./error/api-error-handler.js"));
const apiError_js_1 = __importDefault(require("./error/apiError.js"));
const mainRouter_js_1 = __importDefault(require("./api/mainRouter.js"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_js_1 = require("./logic/auth.js");
const arr = [4, 5, 6, 7];
const secret = "default secret";
const app = (0, express_1.default)();
const router = express_1.default.Router();
app.set('view engine', 'jade');
dotenv_1.default.config();
app.use(express_1.default.json());
router.route("/login")
    .post((req, res, next) => {
    // Authenticate User
    const username = req.body.username;
    const user = { id: req.body.id, userName: req.body.username, password: req.body.password, isAdmin: false };
    const accessToken = jsonwebtoken_1.default.sign(user, secret);
    if (accessToken === null)
        next(new apiError_js_1.default(401, 'the user isnt connect'));
    res.json({ accessToken: accessToken });
    next();
});
app.use(auth_js_1.authenticateToken);
app.use("/api", mainRouter_js_1.default);
app.use(api_error_handler_js_1.default);
app.listen(8080, function () {
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
