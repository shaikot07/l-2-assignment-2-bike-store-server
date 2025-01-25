import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';
import { Request, Response } from 'express';

const newUserRegistration = catchAsync(async (req: Request, res: Response) => {
  // console.log(req.body);
  const result = await AuthServices.registerUser(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Registration successfully!',
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { token } = result;

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user is logged in successfully!',
    data: {
      token,
    },
  });
});

export const AuthControllers = {
  loginUser,
  newUserRegistration,
};
