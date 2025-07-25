import { ApiError } from "../utils/apiError.js";

export const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}

export function errorHandler(err, req, res, next) {
    if (err instanceof ApiError) {
      return res.status(err.status).json({
        status: 'error',
        message: err.message
      });
    }
    console.error(err);
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error'
    });
}