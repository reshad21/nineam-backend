
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from "../config";
import AppError from "../errors/AppError";
import { TUserRole } from "../modules/user/user.interface";
import catchAsync from "../utils/catchAsync";

const auth = (...requiredRoles: TUserRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {

        const token = req.headers.authorization;

        if (!token) {
            throw new AppError(httpStatus.UNAUTHORIZED, "Dont give any token !");
        }

        // checking if the given token is valid
        let decoded;
        try {
            decoded = jwt.verify(
                token,
                config.jwt_access_secret as string,
            ) as JwtPayload;
        } catch (error) {
            throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized');
        }

        const { role, userId, iat } = decoded;

        if (requiredRoles && !requiredRoles.includes(role)) {
            throw new AppError(
                httpStatus.UNAUTHORIZED,
                'You are not authorized  hi!',
            );
        }

        req.user = decoded as JwtPayload & { role: string };
        next();

    });
}

export default auth;