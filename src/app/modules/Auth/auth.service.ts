import httpStatus from "http-status";
import jwt from 'jsonwebtoken';
import config from "../../config";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";

const loginUser = async (payload: TLoginUser) => {
    // console.log(payload);
    // { email: 'john1@example.com', password: '1234' }

    //checking if the user is exists
    const user = await User.isUserExistsByCustomEmail(payload?.email);

    if (!user) {
        throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized !");
    }

    //checking if the password is correct
    const isPasswordMatched = await User.isPasswordMatched(payload?.password, user?.password);

    if (!isPasswordMatched) {
        throw new AppError(httpStatus.FORBIDDEN, "password is not matched !")
    }

    //create access token for authorization
    const tokenData = { email: user?.email, role: user?.role };

    const accessToken = jwt.sign(tokenData, config.jwt_access_secret as string, { expiresIn: '10d' });


    return {
        token: accessToken,
        data: user
    };
}

export const AuthServices = {
    loginUser,
}