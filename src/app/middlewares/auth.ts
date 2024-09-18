import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from "../config";
import AppError from "../errors/AppError";
import { TUserRole } from "../modules/user/user.interface";
import catchAsync from "../utils/catchAsync";

const auth = (...requiredRoles: TUserRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {

        // Extract token from authorization header
        const token = req.headers.authorization;

        if (!token) {
            throw new AppError(httpStatus.UNAUTHORIZED, "Authorization token is missing.");
        }

        try {
            // Verify the token and explicitly type it as JwtPayload
            const decoded = jwt.verify(token, config.jwt_access_secret as string) as JwtPayload;

            if (!decoded) {
                throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized")
            }

            // Ensure that the decoded token has a role property
            const role = (decoded as JwtPayload).role;

            // Check if the user's role is authorized
            if (requiredRoles.length && !requiredRoles.includes(role as TUserRole)) {
                throw new AppError(httpStatus.FORBIDDEN, "User is not authorized to access this resource.");
            }

            // Attach the decoded token to the request object as JwtPayload
            req.user = decoded as JwtPayload;
            next();
        } catch (err) {
            throw new AppError(httpStatus.UNAUTHORIZED, "Invalid or expired token.");
        }
    });
};

export default auth;
