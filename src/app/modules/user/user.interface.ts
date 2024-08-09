/* eslint-disable no-unused-vars */
import { Model } from "mongoose";

export interface TUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: 'admin' | 'user';
};

export interface UserModel extends Model<TUser> {
  isUserExistsByCustomEmail(email: string): Promise<TUser>;
  isPasswordMatched(plainTextPassword: string, hashedPassword: string): Promise<boolean>;
}
