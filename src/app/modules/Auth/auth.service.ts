import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';
import { TLoginUser } from './auth.interface';
import { createToken } from './auth.utils';
import { User } from '../user/user.model';
import { TUser } from '../user/user.interface';

const registerUser = async (payload: TUser) => {
  const userExists = await User.findOne({ email: payload.email });
  if (userExists) {
    throw new AppError(
      httpStatus.CONFLICT,
      `${userExists.email} already Exists`,
    );
  }

  const newUser = await User.create(payload)
  const result = await User.findById(newUser._id)
    .select('-__v -createdAt -updatedAt -password -isBlocked -isDeleted -role') 
    .exec();
  return result;
};
const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  const user = await User.findOne({ email: payload.email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  // checking if the user is already deleted

  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  // Check if the user is blocked
  if (user.isBlocked) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
  }

  //checking if the password is correct

  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

  //create token and sent to the  client

  const jwtPayload = {
    userId: user._id.toString(),
    role: user.role,
  };

  const token = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    token,
  };
};

export const AuthServices = {
  registerUser,
  loginUser,
};
