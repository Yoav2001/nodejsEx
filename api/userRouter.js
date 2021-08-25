// const express = require('express')
// const app = express();


// app.post('/login', (req, res, next) => {

//     // Authenticate User

//     const username = req.body.username
//     const user = { name: username }

//     const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
//     if (accessToken === null)
//         next(new ApiError(401, 'the user isnt connect'))

//     res.json({ accessToken: accessToken })
// })


// export default router;