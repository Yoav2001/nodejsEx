import exp from 'express';
import jwt from 'jsonwebtoken';
import { User } from './userModule'
import ApiError from '../error/apiError';
const jwtSecret: string = "yalh beitar";

type TokenStructure = {
     id: string,
    username: string,
    password: string,
    isAdmin: boolean
}


export function authenticateToken(req:exp.Request, res:exp.Response, next:exp.NextFunction) {


    const bearerHeader: string | undefined = req.headers["authorization"];

    if(typeof bearerHeader === 'undefined')
      return next(new ApiError(401, 'the user isnt connect'))

     const bearer: string[] = bearerHeader.split(" ");
     const bearerToken: string = bearer[1];
    jwt.verify(bearerToken, jwtSecret, (err, PAYLOAD) => {
        if(err)
          return next(new ApiError(401, 'the user isnt connect'))
        req.body.user = PAYLOAD
        next()
    })

}

export function authenticateAdmin(req:exp.Request, res:exp.Response, next:exp.NextFunction) {
    const authHeader = req.headers['authorization']; //= Bearer TOKEN

    const token =authHeader!.split(' ')[1] //the token is the second parameter in the arr
    
    const jwtVer=jwt.verify(token,jwtSecret,(err,value)=>{
        console.log(value)
    })
    const userObj : User=req.body.user;
    // const userName = decodedToken.payload.name;
    if (userObj.userName === "admin")
        next() //move on from the middleWare 
    else {
        // next(new ApiError(403, 'this user dont have Permissions'))
        res.status(403).json('this user dont have Permissions');
    }
}




// //gets called only if authed is passed so the header must be checked for undefined already
// function getTokenHeader(req: exp.Request,res: exp.Response){

//     const bearerHeader: string | undefined = req.headers["authorization"];
//     if(typeof bearerHeader !== 'undefined'){
//         const bearer: string[] = bearerHeader.split(" ");
//         const bearerToken: string = bearer[1];
//         return bearerToken;
//     }
//         res.status(401).json('there is a problem with auth the user ');
    
// }


// export function getSignedTokenDecoded(req: exp.Request,res:exp.Response){
//     const token = getTokenHeader(req,res);
//     if(!token)
//     {
//         // const decodedToken = jwt.decode(token, {
//         //     complete: true
//         // });
//          const decodedToken = jwt.decode(token);
//         console.log(decodedToken);
        
//         return decodedToken;
//     }
// }

// export function returnToken(user: User): string{
//     const jwtData = {
//         username: user.username,
//         isAdmin: user.isAdmin
//     }
    
    
//     return jwt.sign(jwtData, jwtSecret);
// }

// export function getSignedTokenDecoded(req: exp.Request): TokenStructure{
//     const decodedToken = <TokenStructure>jwt.decode(getTokenHeader(req))
//     return decodedToken;
// }
// //This check will occur after the token has been verified so I dont have to worry about forgery - or do I?
// export function isAdmin(req: exp.Request, res: exp.Response, next: exp.NextFunction): void{
//     const jwtToken = getTokenHeader(req);

//     const decodedToken = <TokenStructure>jwt.decode(jwtToken);

//     // console.log(decodedToken.isAdmin);
//     if(decodedToken.isAdmin) next();
//     else res.sendStatus(403);
// }


