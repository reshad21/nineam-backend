import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

// const createUser = catchAsync(async (req, res) => {

//   const result = await UserServices.createUserIntoDB(req.body);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'User registered successfully',
//     data: result,
//   });
// });

const getProfile = catchAsync(async (req, res) => {
  const data = req.user;
  const result = await UserServices.getProfilefromDB(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get profile successfully',
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

export const UserControllers = {
  // createUser,
  getProfile,
  updateProfile,
};
