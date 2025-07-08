import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { RequestHandler } from 'express';
import { DecodedUser } from '../types';
import { STATUS_CODES } from '../utils/constants';
import HttpError from '../types/Error/HttpError';
import { User } from '../models/user';

const _verifyTokenHandler: RequestHandler = async (req, res, next) => {
  let token;
  let authHeader =
    req.headers.authorization || (req.headers.Authorization as string);
  if (authHeader && authHeader.startsWith('Bearer')) {
    token = authHeader.split(' ')[1];
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string,
      (err, decoded) => {
        if (err) {
          throw new HttpError('User is not authorized', STATUS_CODES.UNAUTHORIZED)
        }

        if (typeof decoded !== 'object' || decoded === null) {
          throw new HttpError('Error when verifying token', STATUS_CODES.UNAUTHORIZED)
        }

        req.user = decoded as DecodedUser;
        next();
      },
    );
  } else {
    throw new HttpError("Token is invalid", STATUS_CODES.UNAUTHORIZED)
  }
};

export default asyncHandler(_verifyTokenHandler);
