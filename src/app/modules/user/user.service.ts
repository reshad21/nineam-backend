/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from './user.model';

const getProfilefromDB = async (payload: any) => {
  const result = await User.findOne(
    {
      email: payload.email,
      phone: payload.phone
    }
  ).select('-password');
  return result;
}


//========> update user information <=========//

// const updateProfilefromDB = async (payload: any) => {
//   // Find the user based on email and phone
//   const updateData = await User.findOne({
//     email: payload?.email,
//     phone: payload?.phone,
//   });

//   if (!updateData) {
//     throw new AppError(httpStatus.NOT_FOUND, "Dont get user for update !")
//   }

//   const id = updateData?._id;

//   const updateFields = {
//     name: payload?.name,
//     phone: payload?.phone
//   };

//   const result = await User.findByIdAndUpdate(
//     id,
//     updateFields,
//     { new: true, runValidators: true }
//   ).select('-password');

//   return result;
// };


const updateProfilefromDB = async (payload: any) => {
  
  console.log("get data from db==>",payload);
  console.log("get id from db==>",payload.id);

  const result = await User.findByIdAndUpdate(payload?.id, payload, {
      new: true,
      runValidators: true,
  });

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND,"update is not happen")
  }

  return result;
}


const getAllUsersfromDB = async () => {
  const result = await User.find().select('-password');
  return result;
}

const deleteUserFromDB= async (id: string) => {
  const user = await User.findById(id);
  
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found!");
  }

  const result = await User.findByIdAndDelete(id);
  return result;
}

const updateStatusFromDB = async (id:string, payload: any) => {
  
  // Extract only the role from the payload
  const updateFields = { role: payload?.role };

  console.log("Role to update:", updateFields);
  console.log("User ID:", id);

  // Update the user with the new role
  const result = await User.findByIdAndUpdate(id, updateFields, {
    new: true,
    runValidators: true,
  });

  // If the update didn't happen, throw an error
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Update did not happen");
  }

  return result;
}



export const UserServices = {
  // createUserIntoDB,
  getProfilefromDB,
  updateProfilefromDB,
  getAllUsersfromDB,
  deleteUserFromDB,
  updateStatusFromDB
};
