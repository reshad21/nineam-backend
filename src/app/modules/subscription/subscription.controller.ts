import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SubscriptionServices } from './subscription.service';


const createSubscription = catchAsync(async (req, res) => {
    const result = await SubscriptionServices.createSubscriptionIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Subscription is created succesfully',
        data: result,
    });
});



export const SubscriptionControllers = {
    createSubscription,
};

