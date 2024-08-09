import { TUser } from '../user/user.interface';
import { User } from './user.model';

const createUserIntoDB = async (payload: TUser) => {
  // console.log("Original payload:", payload);
  const result = await User.create(payload);
  return result;
};


export const UserServices = {
  createUserIntoDB,
};
