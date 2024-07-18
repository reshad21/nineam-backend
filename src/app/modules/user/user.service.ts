import { TUser } from '../user/user.interface';
import { User } from './user.model';

const createUserIntoDB = async (payload: TUser) => {
  // Log the original payload
  console.log("Original payload:", payload);

  // Create a new object with the updated id
  const newId = "A_0001";
  const updateData = { ...payload, id: newId };

  const newUser = await User.create(updateData);
  return newUser;


};

export const UserServices = {
  createUserIntoDB,
};
