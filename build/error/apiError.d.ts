declare class ApiError {
    code: number;
    message: string;
    constructor(code: number, message: string);
    static badRequest(msg: string): ApiError;
    static internal(msg: string): ApiError;
}
export default ApiError;
