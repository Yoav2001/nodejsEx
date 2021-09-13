import exp from 'express';
import ApiError from './apiError';
declare function apiErrorHandler(err: ApiError, req: exp.Request, res: exp.Response, next: exp.NextFunction): void;
export default apiErrorHandler;
