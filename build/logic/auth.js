"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateAdmin = exports.authed = exports.getSignedUserType = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtSecret = "yalh beitar";
//gets called only if authed is passed so the header must be checked for undefined already
function getSignedUserType(req, res) {
    if (req.headers["authorization"]) {
        const bearerHeader = req.headers["authorization"];
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        console.log(bearerToken);
        console.log(typeof (jsonwebtoken_1.default.decode(bearerToken)));
        console.log(jsonwebtoken_1.default.decode(bearerToken));
        return jsonwebtoken_1.default.decode(bearerToken);
        //  return  jwt.decode(bearerToken)!.toString();
    }
    const defaultUser = { id: '', userName: "", password: "2121", isAdmin: false };
    res.status(401);
    return defaultUser;
}
exports.getSignedUserType = getSignedUserType;
function authed(req, res, next) {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        jsonwebtoken_1.default.verify(bearerToken, jwtSecret, (err, data) => {
            if (err) {
                res.status(401);
            }
            else {
                next();
            }
        });
    }
    else {
        res.sendStatus(401);
    }
}
exports.authed = authed;
function authenticateAdmin(req, res, next) {
    // const authHeader = req.headers['authorization']; //= Bearer TOKEN
    // const token =authHeader!.split(' ')[1] //the token is the second parameter in the arr
    // const jwtVer=jwt.verify(token,jwtSecret,(err,value)=>{
    //     console.log(value)
    // })
    const userObj = getSignedUserType(req, res);
    // const userName = decodedToken.payload.name;
    if (userObj.userName === "admin")
        next(); //move on from the middleWare 
    else {
        // next(new ApiError(403, 'this user dont have Permissions'))
        res.status(403).json('this user dont have Permissions');
    }
}
exports.authenticateAdmin = authenticateAdmin;
// export function isAdmin(req: exp.Request, res: exp.Response, next: exp.NextFunction): void{
//     const jwtToken = getTokenHeader(req);
//     const decodedToken = <TokenStructure>jwt.decode(jwtToken);
//     // console.log(decodedToken.isAdmin);
//     if(decodedToken.isAdmin) next();
//     else res.sendStatus(403);
// }
// export function returnToken(user: User): string{
//     const jwtData = {
//         username: user.username,
//         isAdmin: user.isAdmin
//     }
//     return jwt.sign(jwtData, jwtSecret);
// }
// export function getSignedTokenDecoded(req: exp.Request,): TokenStructure{
//     if(getTokenHeader(req,res))
//     const decodedToken = jwt.decode()
//     return decodedToken;
// }
//This check will occur after the token has been verified so I dont have to worry about forgery - or do I?
// //gets called only if authed is passed so the header must be checked for undefined already
// function getTokenHeader(req: exp.Request){
//     const bearerHeader: string = req.headers["authorization"];
//     const bearer: string[] = bearerHeader.split(" ");
//     const bearerToken: string = bearer[1];
//     return bearerToken;
// }
// export function authed(req: exp.Request, res: exp.Response, next: exp.NextFunction): void{
//     const bearerHeader: string | undefined = req.headers["authorization"];
//     if(typeof bearerHeader !== 'undefined'){
//         const bearer: string[] = bearerHeader.split(" ");
//         const bearerToken: string = bearer[1];
//         jwt.verify(bearerToken, jwtSecret, (err, data) => {
//             if(err){
//                 res.status(401);
//             }
//             else{
//                 next();
//             }
//         });
//     }
//     else{
//         res.sendStatus(401);
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
// type TokenStructure = {
//      id: string,
//     username: string,
//     password: string,
//     isAdmin: boolean
// }
// export function authenticateToken(req:exp.Request, res:exp.Response, next:exp.NextFunction) {
//     const bearerHeader: string | undefined = req.headers["authorization"];
//     if(typeof bearerHeader === 'undefined')
//       return next(new ApiError(401, 'the user isnt connect'))
//      const bearer: string[] = bearerHeader.split(" ");
//      const bearerToken: string = bearer[1];
//     jwt.verify(bearerToken, jwtSecret, (err, PAYLOAD) => {
//         if(err)
//           return next(new ApiError(401, 'the user isnt connect'))
//         req.body.user = PAYLOAD
//         next()
//     })
// }
// //gets called only if authed is passed so the header must be checked for undefined already
// function getTokenHeader(req: exp.Request,res: exp.Response){
//     const bearerHeader: string = req.headers["authorization"];
//     const bearer: string[] = bearerHeader.split(" ");
//     const bearerToken: string = bearer[1];
//     return bearerToken;
// }
// export function getSignedTokenDecoded(req: exp.Request,res:exp.Response){
//     const token = getTokenHeader(req,res);
//     if(!token)
//     {
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
