import exp from 'express';
import { User } from './userModule';
export declare function getSignedUserType(req: exp.Request, res: exp.Response): User;
export declare function authed(req: exp.Request, res: exp.Response, next: exp.NextFunction): void;
export declare function authenticateAdmin(req: exp.Request, res: exp.Response, next: exp.NextFunction): void;
