"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// require('dotenv').config()
const express_1 = __importDefault(require("express"));
const arrayRouter_js_1 = __importDefault(require("./arrayRouter.js"));
const auth_1 = require("../logic/auth");
const router = express_1.default.Router();
const arr = [4, 5, 6, 7];
router.route("/")
    .get((req, res) => {
    const date = new Date().toJSON().slice(0, 10);
    const userType = (0, auth_1.getSignedUserType)(req, res);
    // console.log(usern);
    res.json({
        msg: "Hello " + userType.userName + " today is " + date,
    });
});
router.route("/echo")
    .get((req, res) => {
    const msg = req.query.msg;
    res.json({
        echo: "The message is " + msg
    });
});
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
router.use("/array/", arrayRouter_js_1.default);
// app.use("/array/", arrayRouter);
exports.default = router;
