// require('dotenv').config()
// const express = require('express')
// const app = express();
// const jwt = require('jsonwebtoken')
// const apiErrorHandler = require('./error/api-error-handler');
// const ApiError = require("./error/apiError")
//     // import { ApiError } from "./error/apiError"
// app.use(express.json())

// app.post('/login', (req, res) => {
//     // Authenticate User

//     const username = req.body.username
//     const user = { name: username }

//     const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
//     res.json(accessToken)
//     res.json({ accessToken: accessToken })
// })



// app.listen(4000)