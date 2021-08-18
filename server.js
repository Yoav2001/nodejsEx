require('dotenv').config()
const express = require('express')
const app = express();
const jwt = require('jsonwebtoken')
app.use(express.json())
const arr = [4, 5, 6, 7];

const posts = [{
        username: "yoav",
        title: "article 1"
    },
    {
        username: "ido",
        title: "article 2"
    },
    {
        username: "bar",
        title: "article 3"
    }
]
app.post('/login', (req, res) => {
    // Authenticate User

    const username = req.body.username
    const user = { name: username }

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({ accessToken: accessToken })
})

app.use(authenticateToken) //this line says that every req have middle ware with this function 

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']; //= Bearer TOKEN
    const token = authHeader && authHeader.split(' ')[1] //the token is the second parameter in the arr
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, PAYLOAD) => {
        // console.log(err)
        if (err) return res.sendStatus(403)
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
    if (userName === "admin")
        next() //move on from the middleWare 
    console.log("in admin auth")

    res.sendStatus(401);

}


app.get('/articles', authenticateToken, (req, res) => {
    res.json(posts.filter(post => post.username === req.user.name))
})


app.get("/", authenticateToken, (req, res) => {
    const date = new Date().toJSON().slice(0, 10);
    res.json({
        msg: "Hello " + req.user.name + " today is " + date,
    });
});
app.get("/echo", authenticateToken, (req, res) => {
    const msg = req.query.msg;
    res.json({
        echo: "The message is " + msg
    })
});


app.get("/array", authenticateToken, (req, res) => {
    res.json(arr)
});
app.get("/array/:index", authenticateToken, (req, res) => {
    const indexInArray = req.params.index;
    const value = arr[indexInArray];
    res.json(value)
});

app.post("/array", authenticateToken, authenticateAdmin, (req, res) => {
    const value = req.body.value
    arr.push(value)

    res.json(arr)

});

app.put("/array/:index", authenticateToken, (req, res) => {
    const indexInArray = req.params.index;
    const value = req.body.value;
    arr[indexInArray] = value;
    res.json(arr)

});

app.delete("/array", authenticateToken, (req, res) => {
    arr.pop();
    res.json(arr)

});
app.delete("/array/:index", authenticateToken, (req, res) => {
    const indexInArray = req.params.index;
    const value = 0
    arr[indexInArray] = value;
    res.json(arr)
});


// app.post('/token', (req, res) => {
//     const refreshToken = req.body.token
//     if (refreshToken == null) return res.sendStatus(401)
//     if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
//     jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
//         if (err) return res.sendStatus(403)
//         const accessToken = generateAccessToken({ name: user.name })
//         res.json({ accessToken: accessToken })
//     })
// })


function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
}
app.listen(3000)