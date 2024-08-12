/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Bike } from '../bike/bike.model';
import { User } from '../user/user.model';
import Booking from './rent.model';

const createBookingIntoDB = async (payload: any, userInfo: any) => {
    // console.log(payload);
    // {bikeId: '66b440713353f842ff7e9f68',startTime: '2024-06-10T09:00:00Z'}
    // console.log(userInfo);

    // Find the user based on email and phone
    const getUserAllinfo = await User.findOne({
        email: userInfo?.email,
        phone: userInfo?.phone,
    });

    if (!getUserAllinfo) {
        throw new AppError(httpStatus.NOT_FOUND, "Dont get user for bookking bike !")
    }

    const userid = getUserAllinfo?._id;

    // const bookingData = {
    //     userId: userid,
    //     bikeId: payload.bikeId,
    //     startTime: payload.startTime,
    //     returnTime: null,
    //     totalCost: 0,
    //     isReturned: false
    // }

    // console.log(bookingData);

    const result = await Booking.create({
        userId: userid,
        bikeId: payload.bikeId,
        startTime: payload.startTime,
        returnTime: null,
        totalCost: 0,
        isReturned: false
    });
    return result;


};

const returnBikeFromUser = async (bookingId: string) => {
    // Find the rental record based on bikeId
    const rental = await Booking.findById(bookingId);

    if (!rental) {
        throw new AppError(httpStatus.NOT_FOUND, "Rental not found!");
    }

    // Check if the bike is already returned
    if (rental.isReturned) {
        throw new AppError(httpStatus.FORBIDDEN, "Bike is already returned!");
    }

    // Calculate the rental duration and total cost
    const returnTime = new Date();
    const startTime = new Date(rental.startTime);

    // Ensure startTime is not in the future
    if (startTime > returnTime) {
        throw new AppError(httpStatus.BAD_REQUEST, "Start time cannot be in the future.");
    }

    const durationInHours = Math.ceil((returnTime.getTime() - startTime.getTime()) / (1000 * 60 * 60));

    const bike = await Bike.findById(rental.bikeId);
    if (!bike) {
        throw new AppError(httpStatus.NOT_FOUND, "Bike not found!");
    }

    const totalCost = durationInHours * bike.pricePerHour;

    // Update the rental record
    rental.returnTime = returnTime;
    rental.totalCost = totalCost;
    rental.isReturned = true;
    await rental.save();

    // Update the bike's availability status
    bike.isAvailable = true;
    await bike.save();

    return rental;
};



export const BookingServices = {
    createBookingIntoDB,
    returnBikeFromUser,
};
