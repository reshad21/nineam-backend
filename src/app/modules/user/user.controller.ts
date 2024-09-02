import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const getProfile = catchAsync(async (req, res) => {
  const data = req.user;
  const result = await UserServices.getProfilefromDB(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User profile retrieved successfully',
    data: result,
  });
});

const updateProfile = catchAsync(async (req, res) => {
  const data = req.user;
  const result = await UserServices.updateProfilefromDB(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile updated successfully',
    data: result,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUsersfromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retrived All Users',
    data: result,
  });
});

export const UserControllers = {
  // createUser,
  getProfile,
  updateProfile,
  getAllUsers
};
