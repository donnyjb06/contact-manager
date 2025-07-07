import { ErrorRequestHandler } from 'express';
import { STATUS_CODES } from '../utils/constants';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const status = err.statusCode ? err.statusCode : 500;
  res.status(status)
  switch (status) {
    case STATUS_CODES.NOT_FOUND:
      res.json({
        title: 'Not Found',
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case STATUS_CODES.VALIDATION_ERROR:
      res.json({
        title: 'Validation Failed',
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case STATUS_CODES.UNAUTHORIZED:
      res.json({
        title: 'Unauthorized',
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case STATUS_CODES.FORBIDDEN:
      res.json({
        title: 'Forbidden',
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case STATUS_CODES.SERVER_ERROR:
      res.json({
        title: 'Server Error',
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    default:
      console.log('No error! Request was successful');
      break;
  }
};
