// require('dotenv').config()
import express from 'express';
import arrayRouter from './arrayRouter.js'
import { User  } from '../logic/userModule.js';
// import {getSignedTokenDecoded} from '../logic/auth'
const router = express.Router();
const arr = [4, 5, 6, 7];

router.route("/")
    .get((req, res) => {
        const date = new Date().toJSON().slice(0, 10);
        // const user: User= getSignedTokenDecoded(req);
     
        res.json({
            msg: "Hello " +req.body.user + " today is " + date,
        });
    });


router.route("/echo")
    .get((req, res) => {
        const msg = req.query.msg;
        res.json({
            echo: "The message is " + msg
        })
    })



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

router.use("/array/", arrayRouter)

// app.use("/array/", arrayRouter);

export default router;