import asyncHandler from 'express-async-handler';
import { RequestHandler } from 'express';
import { STATUS_CODES } from '../utils/constants';
import { User } from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import HttpError from '../types/Error/HttpError';

const _registerUser: RequestHandler = async (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    throw new HttpError('Missing required fields', STATUS_CODES.VALIDATION_ERROR)
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  res.status(201).json({ _id: newUser.id, email: newUser.email });
};
const registerUser = asyncHandler(_registerUser);

const _loginUser: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new HttpError('Missing email or password', STATUS_CODES.VALIDATION_ERROR)
  }

  const user = await User.findOne({ email }).orFail(() => {
    throw new HttpError('User not found', STATUS_CODES.NOT_FOUND)
  });

  if (await bcrypt.compare(password, user.password as string)) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: '1h' },
    );
    res.status(200).json({ accessToken });
    return;
  }

  throw new HttpError('Password is incorrect', STATUS_CODES.UNAUTHORIZED)
};
const loginUser = asyncHandler(_loginUser);

const _getCurrentUser: RequestHandler = async (req, res) => {

  const { user } = req
  if (!user) throw new HttpError("Missing user in request for current user", STATUS_CODES.UNAUTHORIZED)

  const {email, username, id} = await User.findById(user.id).orFail(() => {
    throw new HttpError("User not found in database when fetching current user", 404)
  })

  res.status(200).json({ email, username, id })
};
const getCurrentUser = asyncHandler(_getCurrentUser);

export { registerUser, loginUser, getCurrentUser };
