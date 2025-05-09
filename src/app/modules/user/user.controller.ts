import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { userServices } from './user.services';

const blockUser = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  await userServices.blockUserByAdmin(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user blocked successfully!',
    data: '',
  });
});

const getAllUser= catchAsync(async (req: Request, res: Response) => {
 
  const result= await userServices.getAllUserFromDb();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user  retrieved  successfully!',
    data:result,
  });
});

const updatedUserPersonalInfoById = catchAsync(async(req: Request, res: Response) => {
  const userId = req.params.userId; 
  console.log(userId ,'for updated user id');
  const updatedUserData = req.body;

  const updatedUser = await userServices.updatedUserPersonalInfoById(userId, updatedUserData);

// Send successful response if user info updated successfully
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User info updated successfully',
      data:updatedUser,  // Ensure we return the correct ' (house)
    });
})

const getsingleUserById= catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.userId; 
 
  const result= await userServices.getUserById(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'single User retrieved successfully!',
    data:result,
  });
});



export const userController = {
  blockUser,
  getAllUser,
  updatedUserPersonalInfoById,
  getsingleUserById
};
