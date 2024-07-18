import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { RentServices } from './rent.service';

const createRent = catchAsync(async (req, res) => {

    const result = await RentServices.createRentIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Rent is created succesfully',
        data: result,
    });
});

export const RentControllers = {
    createRent,
};
