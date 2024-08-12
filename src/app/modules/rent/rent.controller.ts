import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BookingServices } from './rent.service';

const createRent = catchAsync(async (req, res) => {
    const userInfo = req.user;
    const result = await BookingServices.createBookingIntoDB(req.body, userInfo);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Rental created successfully',
        data: result,
    });
});

const returnBike = catchAsync(async (req, res) => {
    const bookingId = req.params.id;
    // const userInfo = req.user;

    const result = await BookingServices.returnBikeFromUser(bookingId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Bike returned successfully',
        data: result,
    });
});

export const RentControllers = {
    createRent,
    returnBike
};
