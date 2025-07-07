import asyncHandler from 'express-async-handler';
import { RequestHandler } from 'express';
import { STATUS_CODES } from '../utils/constants';
import { User } from '../models/user';
import bcrypt from 'bcrypt';

const _registerUser: RequestHandler = async (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    const error: any = new Error('Missing required fields');
    error.statusCode = STATUS_CODES.VALIDATION_ERROR;
    throw error;
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

const _loginUser: RequestHandler = async () => {};
const loginUser = asyncHandler(_loginUser);

const _getCurrentUser: RequestHandler = async () => {};
const getCurrentUser = asyncHandler(_getCurrentUser);

export { registerUser, loginUser, getCurrentUser };
