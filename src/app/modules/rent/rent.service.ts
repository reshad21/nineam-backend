/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Bike } from '../bike/bike.model';
import { User } from '../user/user.model';
import Booking from './rent.model';

const createBookingIntoDB = async (payload: any, userInfo: any) => {
    // Find the user based on email and phone
    const getUserAllinfo = await User.findOne({
      email: userInfo?.email,
      phone: userInfo?.phone,
    });
  
    if (!getUserAllinfo) {
      throw new AppError(httpStatus.NOT_FOUND, "User not found for booking the bike!");
    }
  
    const userid = getUserAllinfo?._id;
  
    // Set isAvailable: false for the bike being booked
    const bike = await Bike.findById(payload.bikeId);
    if (!bike) {
      throw new AppError(httpStatus.NOT_FOUND, "Bike not found for booking!");
    }
  
    if (!bike.isAvailable) {
      throw new AppError(httpStatus.BAD_REQUEST, "Bike is already booked!");
    }
  
    // Set the bike as unavailable
    await Bike.findByIdAndUpdate(payload.bikeId, { isAvailable: false });
  
    // Create the booking
    const result = await Booking.create({
      userId: userid,
      bikeId: payload.bikeId,
      startTime: payload.startTime,
      returnTime: null,
      totalCost: 0,
      isReturned: false,
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


const getMyRentsBike = async (payload: any) => {
    // Find the user based on email and phone
    const getUserAllinfo = await User.findOne({
        email: payload?.email,
        phone: payload?.phone,
    });

    if (!getUserAllinfo) {
        throw new AppError(httpStatus.NOT_FOUND, "Dont get user for bookking bike !")
    }

    const userId = getUserAllinfo?._id;

    // Find all rentals for the user
    const rentals = await Booking.find({ userId });

    return rentals;
}



export const BookingServices = {
    createBookingIntoDB,
    returnBikeFromUser,
    getMyRentsBike,
};
