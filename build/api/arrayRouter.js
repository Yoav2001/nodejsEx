"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// require('dotenv').config()
// const arr: number[] = [4, 5, 6, 7];
const arr = [4, 5, 6, 7];
const express_1 = __importDefault(require("express"));
const auth_1 = require("../logic/auth");
const apiError_js_1 = __importDefault(require("../error/apiError.js"));
const router = express_1.default.Router();
//const app = express();
//app.use(express.json());
router.route("/")
    .get((req, res) => {
    res.json(arr);
})
    .post(auth_1.authenticateAdmin, (req, res, next) => {
    const value = req.body.value;
    if (typeof value !== "number") {
        // res.status(403).json('this user dont have Permissions');
        return next(new apiError_js_1.default(400, 'error you give inValid value to put in the arr'));
        //שמתי retrun כי בלי זה קורס
        // רשמתי בווצאפ למה
        // .https://www.codementor.io/@oparaprosper79/understanding-node-error-err_http_headers_sent-117mpk82z8
    }
    else {
        arr.push(value);
        // next()//אם שם את זה פה זה לא עושה כלום האם זה משנה?
    }
    res.json(arr);
})
    .delete(auth_1.authenticateAdmin, (req, res) => {
    arr.pop();
    res.json(arr);
})
    .all((req, res) => {
    res.status(405).send();
});
router.route("/:index")
    .get((req, res, next) => {
    const indexInArray = parseInt(req.params.index);
    if (isNaN(indexInArray) || indexInArray >= arr.length) {
        next(new apiError_js_1.default(400, 'error you give inValid index'));
    }
    else
        res.json(arr[indexInArray]);
})
    .put(auth_1.authenticateAdmin, (req, res, next) => {
    const indexInArray = parseInt(req.params.index);
    const value = parseInt(req.body.value);
    if (isNaN(indexInArray) || isNaN(value) || indexInArray >= arr.length)
        next(new apiError_js_1.default(400, 'error you give in inValid index/value '));
    else {
        arr[indexInArray] = value;
        res.json(arr);
    }
})
    .delete(auth_1.authenticateAdmin, (req, res, next) => {
    const indexInArray = parseInt(req.params.index);
    const value = 0;
    if (isNaN(indexInArray) || indexInArray >= arr.length)
        next(new apiError_js_1.default(400, 'error you give in inValid index'));
    else {
        arr[indexInArray] = value;
        res.json(arr);
    }
});
// if (router.stack.filter(layer => {
//         if (layer.route === undefined) { return false }
//         return layer.route.path === req.path
// )
exports.default = router;
//module.exports = router
